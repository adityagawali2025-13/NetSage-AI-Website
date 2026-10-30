#!/usr/bin/env python3
"""
NetSage AI deterministic rule checker.
Checks common Cisco lab configuration mistakes without using AI.
Input may be a JSON file containing the supported fields below.
Usage:
    python netsage_checker.py sample_cases.json
"""

import json, ipaddress, sys

def check_duplicate_ips(devices):
    seen = {}
    findings = []
    for d in devices:
        ip = d.get("ip")
        if not ip:
            continue
        if ip in seen:
            findings.append(f"Duplicate IP: {ip} used by {seen[ip]} and {d.get('name')}")
        else:
            seen[ip] = d.get("name")
    return findings

def check_masks(devices):
    findings = []
    for d in devices:
        ip = d.get("ip")
        mask = d.get("mask")
        if not ip or not mask:
            continue
        try:
            net = ipaddress.ip_network(f"{ip}/{mask}", strict=False)
            # A /32 host mask is valid but usually suspicious in a LAN host entry.
            if net.prefixlen == 32 and d.get("type") == "host":
                findings.append(f"Suspicious host mask /32 on {d.get('name')} ({ip})")
        except ValueError:
            findings.append(f"Invalid IP/mask on {d.get('name')}: {ip} {mask}")
    return findings

def check_gateway(devices):
    findings = []
    for d in devices:
        if d.get("type") != "host":
            continue
        ip, mask, gw = d.get("ip"), d.get("mask"), d.get("gateway")
        if not ip or not mask or not gw:
            continue
        try:
            net = ipaddress.ip_network(f"{ip}/{mask}", strict=False)
            if ipaddress.ip_address(gw) not in net:
                findings.append(f"Gateway mismatch: {d.get('name')} gateway {gw} is outside {net}")
        except ValueError:
            pass
    return findings

def check_interfaces(interfaces):
    findings = []
    for i in interfaces:
        state = i.get("state","").lower()
        protocol = i.get("protocol","").lower()
        if state in ("administratively down","shutdown","disabled") or protocol == "down":
            findings.append(f"Interface down: {i.get('device')} {i.get('interface')} ({state}/{protocol})")
    return findings

def check_vlans(switches):
    findings = []
    for s in switches:
        present = set(map(int, s.get("present_vlans", [])))
        required = set(map(int, s.get("required_vlans", [])))
        for vlan in sorted(required - present):
            findings.append(f"Missing VLAN {vlan} on {s.get('name')}")
    return findings

def check_routes(routes):
    findings = []
    for r in routes:
        destination = r.get("destination")
        if not r.get("next_hop") and not r.get("interface"):
            findings.append(f"Missing route next-hop/interface for {destination} on {r.get('device')}")
        if r.get("reachable_next_hop") is False:
            findings.append(f"Unreachable next hop {r.get('next_hop')} for {destination} on {r.get('device')}")
    return findings

def run(data):
    findings = []
    findings += check_duplicate_ips(data.get("devices", []))
    findings += check_masks(data.get("devices", []))
    findings += check_gateway(data.get("devices", []))
    findings += check_interfaces(data.get("interfaces", []))
    findings += check_vlans(data.get("switches", []))
    findings += check_routes(data.get("routes", []))
    return findings

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python netsage_checker.py sample_cases.json")
        sys.exit(1)
    with open(sys.argv[1], encoding="utf-8") as f:
        data = json.load(f)
    findings = run(data)
    print("NetSage AI Rule Checker")
    print("=======================")
    if findings:
        print(f"Findings: {len(findings)}")
        for x in findings:
            print("[ALERT]", x)
    else:
        print("No deterministic rule violations found.")
