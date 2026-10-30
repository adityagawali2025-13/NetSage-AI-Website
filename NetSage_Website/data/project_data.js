window.NETSAGE_DATA = {
"cases": [
{
"case_id": "C01",
"issue_type": "VLAN",
"symptom": "PC in VLAN 10 can ping its gateway but cannot ping a PC in VLAN 20.",
"topology_note": "Two access switches connect to R1-on-a-stick; VLANs 10 and 20 exist.",
"show_outputs": "SW1: show vlan brief -> VLAN 20 missing; show interfaces trunk -> trunk up.",
"expected_fault": "Missing VLAN 20 on SW1",
"osi_layer": "Layer 2",
"concept_tag": "VLAN",
"severity": "Medium"
},
{
"case_id": "C02",
"issue_type": "VLAN",
"symptom": "PC receives an address but cannot reach another host in the same VLAN.",
"topology_note": "Two PCs are intended for VLAN 10; one switch port is assigned to VLAN 20.",
"show_outputs": "SW1: show vlan brief -> VLAN 10 active; show interfaces gi0/2 switchport -> Access Mode VLAN: 20.",
"expected_fault": "Wrong access VLAN on interface Gi0/2",
"osi_layer": "Layer 2",
"concept_tag": "VLAN",
"severity": "Medium"
},
{
"case_id": "C03",
"issue_type": "VLAN",
"symptom": "Inter-VLAN traffic fails although both gateways respond locally.",
"topology_note": "Router-on-a-stick configured for VLAN 10 and 20.",
"show_outputs": "R1: show interfaces g0/0.20 -> subinterface exists; SW1: show interfaces trunk -> VLAN 20 not allowed.",
"expected_fault": "VLAN 20 is not allowed on trunk",
"osi_layer": "Layer 2",
"concept_tag": "VLAN",
"severity": "High"
},
{
"case_id": "C04",
"issue_type": "Gateway",
"symptom": "PC can reach local subnet but not remote subnet.",
"topology_note": "PC 192.168.10.20/24; router gateway should be 192.168.10.1.",
"show_outputs": "PC IP config -> Default Gateway: 192.168.10.254; R1 g0/0: 192.168.10.1/24.",
"expected_fault": "Gateway mismatch on host",
"osi_layer": "Layer 3",
"concept_tag": "Gateway",
"severity": "High"
},
{
"case_id": "C05",
"issue_type": "Gateway",
"symptom": "PC can ping nearby hosts but cannot reach any routed network.",
"topology_note": "Host is in 192.168.20.0/24.",
"show_outputs": "PC: IP 192.168.20.15 mask 255.255.255.0 gateway 192.168.10.1; gateway is outside subnet.",
"expected_fault": "Invalid default gateway for host subnet",
"osi_layer": "Layer 3",
"concept_tag": "Gateway",
"severity": "High"
},
{
"case_id": "C06",
"issue_type": "Subnet Mask",
"symptom": "Two hosts in different /24 networks appear unable to use the router.",
"topology_note": "Host A 192.168.10.10 should be /24.",
"show_outputs": "PC A: IP 192.168.10.10 mask 255.255.0.0; router interface 192.168.10.1/24.",
"expected_fault": "Wrong subnet mask on host",
"osi_layer": "Layer 3",
"concept_tag": "Subnet Mask",
"severity": "Medium"
},
{
"case_id": "C07",
"issue_type": "Subnet Mask",
"symptom": "PC cannot ping its gateway despite correct IP range.",
"topology_note": "PC should be 192.168.30.20/24 with gateway 192.168.30.1.",
"show_outputs": "PC: 192.168.30.20 255.255.255.128; gateway 192.168.30.1.",
"expected_fault": "Mask places gateway outside host subnet",
"osi_layer": "Layer 3",
"concept_tag": "Subnet Mask",
"severity": "High"
},
{
"case_id": "C08",
"issue_type": "Duplicate IP",
"symptom": "Intermittent connectivity occurs between two PCs.",
"topology_note": "Both PCs are configured in VLAN 10.",
"show_outputs": "show ip arp -> 192.168.10.50 maps to changing MACs; PC configs show both use 192.168.10.50.",
"expected_fault": "Duplicate IPv4 address",
"osi_layer": "Layer 2/3",
"concept_tag": "Duplicate IP",
"severity": "High"
},
{
"case_id": "C09",
"issue_type": "Interface Down",
"symptom": "PC connected to access switch has no network connectivity.",
"topology_note": "PC is connected to Gi0/3; link should be up.",
"show_outputs": "SW1: show interfaces status -> Gi0/3 disabled; show interfaces gi0/3 -> administratively down.",
"expected_fault": "Interface Gi0/3 is administratively down",
"osi_layer": "Layer 1/2",
"concept_tag": "Interface",
"severity": "High"
},
{
"case_id": "C10",
"issue_type": "Interface Down",
"symptom": "Router cannot form a routed link to the next router.",
"topology_note": "R1 G0/1 connects to R2 G0/0.",
"show_outputs": "R1: show ip interface brief -> G0/1 10.0.0.1 administratively down/down.",
"expected_fault": "R1 G0/1 is shut down",
"osi_layer": "Layer 1/3",
"concept_tag": "Interface",
"severity": "High"
},
{
"case_id": "C11",
"issue_type": "Missing Route",
"symptom": "LAN 10 can reach R1 but not LAN 30.",
"topology_note": "R1 connects to R2; LAN 30 is behind R2.",
"show_outputs": "R1: show ip route -> no 192.168.30.0/24 route; R2 has connected 192.168.30.0/24.",
"expected_fault": "Missing route on R1",
"osi_layer": "Layer 3",
"concept_tag": "Routing",
"severity": "High"
},
{
"case_id": "C12",
"issue_type": "Missing Route",
"symptom": "Remote router receives packets but replies never return.",
"topology_note": "R1 LAN 10, R2 LAN 20.",
"show_outputs": "R2: show ip route -> no 192.168.10.0/24 route; R1 has route to LAN 20.",
"expected_fault": "Missing return route on R2",
"osi_layer": "Layer 3",
"concept_tag": "Routing",
"severity": "High"
},
{
"case_id": "C13",
"issue_type": "Routing",
"symptom": "Two routers have a static route but remote network is still unreachable.",
"topology_note": "R1 route points to 10.0.0.2; R2 transit interface is 10.0.0.6.",
"show_outputs": "R1: show ip route 192.168.20.0 -> via 10.0.0.2; show ip route 10.0.0.2 -> not reachable.",
"expected_fault": "Incorrect next-hop address",
"osi_layer": "Layer 3",
"concept_tag": "Routing",
"severity": "High"
},
{
"case_id": "C14",
"issue_type": "DHCP",
"symptom": "PC gets 169.254.x.x instead of a valid lab address.",
"topology_note": "DHCP server is on another subnet; router should relay DHCP.",
"show_outputs": "PC: IP 169.254.12.4; R1 g0/0: no ip helper-address; DHCP server 192.168.50.10.",
"expected_fault": "Missing DHCP relay configuration",
"osi_layer": "Layer 3",
"concept_tag": "DHCP",
"severity": "High"
},
{
"case_id": "C15",
"issue_type": "DHCP",
"symptom": "PC gets an address from the wrong network.",
"topology_note": "DHCP pools exist for VLAN 10 and VLAN 20.",
"show_outputs": "R1: show ip dhcp binding -> PC gets 192.168.20.11; SW1 port for PC is VLAN 10.",
"expected_fault": "Client placed in wrong VLAN / wrong DHCP scope",
"osi_layer": "Layer 2/3",
"concept_tag": "DHCP",
"severity": "High"
},
{
"case_id": "C16",
"issue_type": "DHCP",
"symptom": "Only some PCs receive DHCP addresses.",
"topology_note": "DHCP pool should serve 192.168.10.0/24.",
"show_outputs": "R1: show ip dhcp pool -> Addresses available: 0; show ip dhcp binding -> many leases.",
"expected_fault": "DHCP pool exhausted",
"osi_layer": "Layer 3",
"concept_tag": "DHCP",
"severity": "Medium"
},
{
"case_id": "C17",
"issue_type": "DNS",
"symptom": "PC can ping 8.8.8.8 but cannot open a server by hostname.",
"topology_note": "IP connectivity to DNS server exists.",
"show_outputs": "PC: DNS Server = 0.0.0.0; ping 8.8.8.8 succeeds; ping intranet.local fails.",
"expected_fault": "DNS server address missing",
"osi_layer": "Layer 7",
"concept_tag": "DNS",
"severity": "Medium"
},
{
"case_id": "C18",
"issue_type": "DNS",
"symptom": "PC reaches DNS server but hostname resolution fails.",
"topology_note": "DNS server should contain intranet.local -> 192.168.10.100.",
"show_outputs": "DNS server: show hosts -> no intranet.local record; PC DNS points to 192.168.50.10.",
"expected_fault": "Missing DNS A record",
"osi_layer": "Layer 7",
"concept_tag": "DNS",
"severity": "Medium"
},
{
"case_id": "C19",
"issue_type": "ACL",
"symptom": "PC can reach gateway but cannot reach web server.",
"topology_note": "ACL is intended to permit VLAN 10 to server 192.168.30.10 on TCP 80.",
"show_outputs": "R1: show access-lists -> deny ip 192.168.10.0 0.0.0.255 any hitcount 12.",
"expected_fault": "ACL denies source subnet",
"osi_layer": "Layer 3/4",
"concept_tag": "ACL",
"severity": "High"
},
{
"case_id": "C20",
"issue_type": "ACL",
"symptom": "Ping works but HTTP access to server fails.",
"topology_note": "Server 192.168.30.10; ACL should permit TCP 80.",
"show_outputs": "R1: show access-lists -> permit icmp any host 192.168.30.10; no permit tcp any host 192.168.30.10 eq 80.",
"expected_fault": "HTTP is not permitted by ACL",
"osi_layer": "Layer 4",
"concept_tag": "ACL",
"severity": "High"
},
{
"case_id": "C21",
"issue_type": "NAT",
"symptom": "Inside hosts can reach router but cannot reach external test network.",
"topology_note": "PAT is required on R1.",
"show_outputs": "R1: show ip nat translations -> empty; show run | include ip nat -> no overload statement.",
"expected_fault": "Missing NAT overload rule",
"osi_layer": "Layer 3",
"concept_tag": "NAT",
"severity": "High"
},
{
"case_id": "C22",
"issue_type": "NAT",
"symptom": "Only one internal PC can access the outside network at a time.",
"topology_note": "PAT configuration exists but uses one-to-one static NAT.",
"show_outputs": "show ip nat translations -> single inside-local/global mapping; no overload rule.",
"expected_fault": "Static NAT used where PAT is required",
"osi_layer": "Layer 3",
"concept_tag": "NAT",
"severity": "Medium"
},
{
"case_id": "C23",
"issue_type": "Wireless",
"symptom": "Wireless client associates with AP but cannot reach gateway.",
"topology_note": "AP is mapped to VLAN 30; switch access port is VLAN 10.",
"show_outputs": "SW1: show vlan brief -> Gi0/5 access VLAN 10; AP management/SSID should use VLAN 30.",
"expected_fault": "AP switch port mapped to wrong VLAN",
"osi_layer": "Layer 2",
"concept_tag": "Wireless",
"severity": "High"
},
{
"case_id": "C24",
"issue_type": "Wireless",
"symptom": "Guest Wi-Fi can reach internal server.",
"topology_note": "Guest VLAN should be isolated from internal VLAN 10.",
"show_outputs": "R1: show access-lists -> no deny from 192.168.50.0/24 to 192.168.10.0/24.",
"expected_fault": "Guest isolation ACL missing",
"osi_layer": "Layer 3/4",
"concept_tag": "Wireless",
"severity": "High"
},
{
"case_id": "C25",
"issue_type": "VLAN",
"symptom": "Voice devices fail while data PCs work.",
"topology_note": "Switch has VLAN 10 data and VLAN 20 voice.",
"show_outputs": "SW1: show interfaces gi0/10 switchport -> voice VLAN: none; data VLAN: 10.",
"expected_fault": "Voice VLAN missing on access port",
"osi_layer": "Layer 2",
"concept_tag": "VLAN",
"severity": "Medium"
},
{
"case_id": "C26",
"issue_type": "Interface Down",
"symptom": "Link between switches is down after configuration change.",
"topology_note": "SW1 Gi0/24 connects to SW2 Gi0/24.",
"show_outputs": "SW1: show interfaces gi0/24 status -> notconnect; SW2: show interfaces gi0/24 -> administratively down.",
"expected_fault": "SW2 uplink interface is shut down",
"osi_layer": "Layer 1/2",
"concept_tag": "Interface",
"severity": "High"
},
{
"case_id": "C27",
"issue_type": "Routing",
"symptom": "OSPF neighbors never reach FULL state.",
"topology_note": "R1 and R2 are directly connected in area 0.",
"show_outputs": "R1: show ip ospf neighbor -> no neighbors; show ip ospf interface -> area 1; R2 interface is area 0.",
"expected_fault": "OSPF area mismatch",
"osi_layer": "Layer 3",
"concept_tag": "Routing",
"severity": "High"
},
{
"case_id": "C28",
"issue_type": "ACL",
"symptom": "SSH management works from one subnet but not another.",
"topology_note": "Only IT subnet 192.168.40.0/24 should access VTY lines.",
"show_outputs": "R1: show access-lists -> permit tcp 192.168.40.0 0.0.0.255 any eq 22; user is 192.168.30.20.",
"expected_fault": "Management ACL blocks unauthorized subnet",
"osi_layer": "Layer 4/7",
"concept_tag": "ACL",
"severity": "Medium"
},
{
"case_id": "C29",
"issue_type": "DHCP",
"symptom": "PC receives a valid IP but wrong DNS server.",
"topology_note": "DHCP pool should advertise DNS 192.168.50.10.",
"show_outputs": "R1: show run | section dhcp -> no dns-server statement in pool.",
"expected_fault": "DHCP pool missing DNS option",
"osi_layer": "Layer 7",
"concept_tag": "DHCP",
"severity": "Medium"
},
{
"case_id": "C30",
"issue_type": "Routing",
"symptom": "Default route exists but internet test still fails.",
"topology_note": "R1 should use next hop 203.0.113.1 on WAN interface.",
"show_outputs": "R1: show ip route 0.0.0.0 -> via 203.0.113.254; WAN gateway is 203.0.113.1.",
"expected_fault": "Incorrect default-route next hop",
"osi_layer": "Layer 3",
"concept_tag": "Routing",
"severity": "High"
}
],
"reviews": [
{
"case_id": "C01",
"ai_root_cause": "Missing VLAN 20 on SW1",
"ai_confidence": "0.93",
"evidence_reference": "SW1: show vlan brief -> VLAN 20 missing; show interfaces trunk -> trunk up.",
"next_command": "show interfaces trunk",
"suggested_fix": "Review and correct Missing VLAN 20 on SW1; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C02",
"ai_root_cause": "Wrong access VLAN on interface Gi0/2",
"ai_confidence": "0.88",
"evidence_reference": "SW1: show vlan brief -> VLAN 10 active; show interfaces gi0/2 switchport -> Access Mode VLAN: 20.",
"next_command": "show interfaces trunk",
"suggested_fix": "Review and correct Wrong access VLAN on interface Gi0/2; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C03",
"ai_root_cause": "VLAN 20 is not allowed on trunk",
"ai_confidence": "0.88",
"evidence_reference": "R1: show interfaces g0/0.20 -> subinterface exists; SW1: show interfaces trunk -> VLAN 20 not allowed.",
"next_command": "show interfaces trunk",
"suggested_fix": "Review and correct VLAN 20 is not allowed on trunk; then verify connectivity.",
"human_decision": "Edited",
"review_note": "AI initially blamed router configuration; human checked trunk evidence and corrected diagnosis to VLAN 20 not allowed on trunk."
},
{
"case_id": "C04",
"ai_root_cause": "Gateway mismatch on host",
"ai_confidence": "0.93",
"evidence_reference": "PC IP config -> Default Gateway: 192.168.10.254; R1 g0/0: 192.168.10.1/24.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Gateway mismatch on host; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C05",
"ai_root_cause": "Invalid default gateway for host subnet",
"ai_confidence": "0.88",
"evidence_reference": "PC: IP 192.168.20.15 mask 255.255.255.0 gateway 192.168.10.1; gateway is outside subnet.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Invalid default gateway for host subnet; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C06",
"ai_root_cause": "Wrong subnet mask on host",
"ai_confidence": "0.88",
"evidence_reference": "PC A: IP 192.168.10.10 mask 255.255.0.0; router interface 192.168.10.1/24.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Wrong subnet mask on host; then verify connectivity.",
"human_decision": "Rejected",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C07",
"ai_root_cause": "Mask places gateway outside host subnet",
"ai_confidence": "0.88",
"evidence_reference": "PC: 192.168.30.20 255.255.255.128; gateway 192.168.30.1.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Mask places gateway outside host subnet; then verify connectivity.",
"human_decision": "Edited",
"review_note": "AI initially called it a gateway mismatch; human checked subnet math and corrected it to an incorrect /25 mask."
},
{
"case_id": "C08",
"ai_root_cause": "Duplicate IPv4 address",
"ai_confidence": "0.88",
"evidence_reference": "show ip arp -> 192.168.10.50 maps to changing MACs; PC configs show both use 192.168.10.50.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Duplicate IPv4 address; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C09",
"ai_root_cause": "Interface Gi0/3 is administratively down",
"ai_confidence": "0.88",
"evidence_reference": "SW1: show interfaces status -> Gi0/3 disabled; show interfaces gi0/3 -> administratively down.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Interface Gi0/3 is administratively down; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C10",
"ai_root_cause": "R1 G0/1 is shut down",
"ai_confidence": "0.88",
"evidence_reference": "R1: show ip interface brief -> G0/1 10.0.0.1 administratively down/down.",
"next_command": "show running-config",
"suggested_fix": "Review and correct R1 G0/1 is shut down; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C11",
"ai_root_cause": "Missing route on R1",
"ai_confidence": "0.93",
"evidence_reference": "R1: show ip route -> no 192.168.30.0/24 route; R2 has connected 192.168.30.0/24.",
"next_command": "show ip route",
"suggested_fix": "Review and correct Missing route on R1; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C12",
"ai_root_cause": "Missing return route on R2",
"ai_confidence": "0.93",
"evidence_reference": "R2: show ip route -> no 192.168.10.0/24 route; R1 has route to LAN 20.",
"next_command": "show ip route",
"suggested_fix": "Review and correct Missing return route on R2; then verify connectivity.",
"human_decision": "Rejected",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C13",
"ai_root_cause": "Incorrect next-hop address",
"ai_confidence": "0.88",
"evidence_reference": "R1: show ip route 192.168.20.0 -> via 10.0.0.2; show ip route 10.0.0.2 -> not reachable.",
"next_command": "show ip route",
"suggested_fix": "Review and correct Incorrect next-hop address; then verify connectivity.",
"human_decision": "Edited",
"review_note": "AI initially recommended adding a static route; human found the route existed but its next hop was unreachable."
},
{
"case_id": "C14",
"ai_root_cause": "Missing DHCP relay configuration",
"ai_confidence": "0.93",
"evidence_reference": "PC: IP 169.254.12.4; R1 g0/0: no ip helper-address; DHCP server 192.168.50.10.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Missing DHCP relay configuration; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C15",
"ai_root_cause": "Client placed in wrong VLAN / wrong DHCP scope",
"ai_confidence": "0.88",
"evidence_reference": "R1: show ip dhcp binding -> PC gets 192.168.20.11; SW1 port for PC is VLAN 10.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Client placed in wrong VLAN / wrong DHCP scope; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C16",
"ai_root_cause": "DHCP pool exhausted",
"ai_confidence": "0.88",
"evidence_reference": "R1: show ip dhcp pool -> Addresses available: 0; show ip dhcp binding -> many leases.",
"next_command": "show running-config",
"suggested_fix": "Review and correct DHCP pool exhausted; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C17",
"ai_root_cause": "DNS server address missing",
"ai_confidence": "0.93",
"evidence_reference": "PC: DNS Server = 0.0.0.0; ping 8.8.8.8 succeeds; ping intranet.local fails.",
"next_command": "show running-config",
"suggested_fix": "Review and correct DNS server address missing; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C18",
"ai_root_cause": "Missing DNS A record",
"ai_confidence": "0.93",
"evidence_reference": "DNS server: show hosts -> no intranet.local record; PC DNS points to 192.168.50.10.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Missing DNS A record; then verify connectivity.",
"human_decision": "Rejected",
"review_note": "AI initially suspected client DNS settings; human verified DNS server was reachable and corrected diagnosis to missing A record."
},
{
"case_id": "C19",
"ai_root_cause": "ACL denies source subnet",
"ai_confidence": "0.88",
"evidence_reference": "R1: show access-lists -> deny ip 192.168.10.0 0.0.0.255 any hitcount 12.",
"next_command": "show access-lists",
"suggested_fix": "Review and correct ACL denies source subnet; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C20",
"ai_root_cause": "HTTP is not permitted by ACL",
"ai_confidence": "0.88",
"evidence_reference": "R1: show access-lists -> permit icmp any host 192.168.30.10; no permit tcp any host 192.168.30.10 eq 80.",
"next_command": "show access-lists",
"suggested_fix": "Review and correct HTTP is not permitted by ACL; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C21",
"ai_root_cause": "Missing NAT overload rule",
"ai_confidence": "0.93",
"evidence_reference": "R1: show ip nat translations -> empty; show run | include ip nat -> no overload statement.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Missing NAT overload rule; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C22",
"ai_root_cause": "Static NAT used where PAT is required",
"ai_confidence": "0.88",
"evidence_reference": "show ip nat translations -> single inside-local/global mapping; no overload rule.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Static NAT used where PAT is required; then verify connectivity.",
"human_decision": "Edited",
"review_note": "AI initially recommended adding another static NAT mapping; human corrected it to PAT/overload for multiple inside hosts."
},
{
"case_id": "C23",
"ai_root_cause": "AP switch port mapped to wrong VLAN",
"ai_confidence": "0.88",
"evidence_reference": "SW1: show vlan brief -> Gi0/5 access VLAN 10; AP management/SSID should use VLAN 30.",
"next_command": "show running-config",
"suggested_fix": "Review and correct AP switch port mapped to wrong VLAN; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C24",
"ai_root_cause": "Guest isolation ACL missing",
"ai_confidence": "0.93",
"evidence_reference": "R1: show access-lists -> no deny from 192.168.50.0/24 to 192.168.10.0/24.",
"next_command": "show running-config",
"suggested_fix": "Review and correct Guest isolation ACL missing; then verify connectivity.",
"human_decision": "Rejected",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C25",
"ai_root_cause": "Voice VLAN missing on access port",
"ai_confidence": "0.93",
"evidence_reference": "SW1: show interfaces gi0/10 switchport -> voice VLAN: none; data VLAN: 10.",
"next_command": "show interfaces trunk",
"suggested_fix": "Review and correct Voice VLAN missing on access port; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C26",
"ai_root_cause": "SW2 uplink interface is shut down",
"ai_confidence": "0.88",
"evidence_reference": "SW1: show interfaces gi0/24 status -> notconnect; SW2: show interfaces gi0/24 -> administratively down.",
"next_command": "show running-config",
"suggested_fix": "Review and correct SW2 uplink interface is shut down; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C27",
"ai_root_cause": "OSPF area mismatch",
"ai_confidence": "0.93",
"evidence_reference": "R1: show ip ospf neighbor -> no neighbors; show ip ospf interface -> area 1; R2 interface is area 0.",
"next_command": "show ip route",
"suggested_fix": "Review and correct OSPF area mismatch; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C28",
"ai_root_cause": "Management ACL blocks unauthorized subnet",
"ai_confidence": "0.88",
"evidence_reference": "R1: show access-lists -> permit tcp 192.168.40.0 0.0.0.255 any eq 22; user is 192.168.30.20.",
"next_command": "show access-lists",
"suggested_fix": "Review and correct Management ACL blocks unauthorized subnet; then verify connectivity.",
"human_decision": "Accepted",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C29",
"ai_root_cause": "DHCP pool missing DNS option",
"ai_confidence": "0.93",
"evidence_reference": "R1: show run | section dhcp -> no dns-server statement in pool.",
"next_command": "show running-config",
"suggested_fix": "Review and correct DHCP pool missing DNS option; then verify connectivity.",
"human_decision": "Edited",
"review_note": "No correction required; evidence matched expected fault."
},
{
"case_id": "C30",
"ai_root_cause": "Incorrect default-route next hop",
"ai_confidence": "0.88",
"evidence_reference": "R1: show ip route 0.0.0.0 -> via 203.0.113.254; WAN gateway is 203.0.113.1.",
"next_command": "show ip route",
"suggested_fix": "Review and correct Incorrect default-route next hop; then verify connectivity.",
"human_decision": "Rejected",
"review_note": "No correction required; evidence matched expected fault."
}
],
"sample": {
"devices": [
{
"name": "PC1",
"type": "host",
"ip": "192.168.10.50",
"mask": "255.255.255.0",
"gateway": "192.168.10.1"
},
{
"name": "PC2",
"type": "host",
"ip": "192.168.10.50",
"mask": "255.255.255.0",
"gateway": "192.168.10.1"
},
{
"name": "PC3",
"type": "host",
"ip": "192.168.20.15",
"mask": "255.255.255.0",
"gateway": "192.168.10.1"
}
],
"interfaces": [
{
"device": "SW1",
"interface": "Gi0/3",
"state": "administratively down",
"protocol": "down"
}
],
"switches": [
{
"name": "SW1",
"present_vlans": [
10,
30
],
"required_vlans": [
10,
20,
30
]
}
],
"routes": [
{
"device": "R1",
"destination": "192.168.30.0/24",
"next_hop": "10.0.0.2",
"reachable_next_hop": false
},
{
"device": "R1",
"destination": "192.168.40.0/24"
}
]
}
};
