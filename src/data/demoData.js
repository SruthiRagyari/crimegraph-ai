// Demo data representing a fictional AP crime network (all data is fictional for demonstration)
export const demoNodes = [
    // Suspects
    { id: 1, label: 'Ravi Kumar',   type: 'suspect',  details: { Role: 'Primary Suspect', Age: '34 years', Location: 'Vijayawada', Cases: 'Case #2024-001, Case #2024-045', Status: 'Under Investigation' } },
    { id: 2, label: 'Venkat Rao',   type: 'suspect',  details: { Role: 'Associate',        Age: '29 years', Location: 'Guntur',      Cases: 'Case #2024-001',              Status: 'Absconding' } },
    { id: 3, label: 'Suresh Babu',  type: 'suspect',  details: { Role: 'Financier',        Age: '47 years', Location: 'Visakhapatnam', Cases: 'Case #2024-045, Case #2024-123', Status: 'Arrested' } },
    { id: 4, label: 'Priya Sharma', type: 'suspect',  details: { Role: 'Associate',        Age: '26 years', Location: 'Nellore',     Cases: 'Case #2024-001',              Status: 'Under Investigation' } },
    { id: 5, label: 'Mohan Reddy',  type: 'suspect',  details: { Role: 'Kingpin',          Age: '52 years', Location: 'Unknown',     Cases: 'Case #2024-045, Case #2024-123', Status: 'Wanted' } },

    // Crimes
    { id: 6,  label: 'Phone Scam',     type: 'crime',    details: { 'Case No': '#2024-001', Type: 'Cybercrime',       Date: '12 Jan 2024', Amount: '₹18.5 Lakhs',  Status: 'Active',       Section: 'IT Act 66D' } },
    { id: 7,  label: 'Bank Fraud',     type: 'crime',    details: { 'Case No': '#2024-045', Type: 'Financial Fraud',  Date: '03 Mar 2024', Amount: '₹2.3 Crores',  Status: 'Under Trial',  Section: 'IPC 420' } },
    { id: 8,  label: 'Vehicle Theft',  type: 'crime',    details: { 'Case No': '#2024-123', Type: 'Property Crime',   Date: '28 Jun 2024', Amount: 'N/A',           Status: 'Active',       Section: 'IPC 379' } },

    // Locations
    { id: 9,  label: 'Vijayawada Junction', type: 'location', details: { City: 'Vijayawada', District: 'Krishna',   Significance: 'Primary meeting point',    Visits: '14 recorded visits' } },
    { id: 10, label: 'Guntur Market',       type: 'location', details: { City: 'Guntur',      District: 'Guntur',    Significance: 'Transaction location',      Visits: '7 recorded visits' } },
    { id: 11, label: 'Tirupati Highway',    type: 'location', details: { City: 'Tirupati',    District: 'Chittoor',  Significance: 'Vehicle handover point',    Visits: '3 recorded visits' } },

    // Phones
    { id: 12, label: '+91-98***-1234', type: 'phone', details: { Number: '+91-98***-1234', Type: 'Burner Phone',   'Total Calls': '47 calls',  'Registered To': 'Unknown',     'Last Seen': '15 Jul 2024' } },
    { id: 13, label: '+91-76***-5678', type: 'phone', details: { Number: '+91-76***-5678', Type: 'Registered SIM', 'Total Calls': '112 calls', 'Registered To': 'Ravi Kumar',  'Last Seen': '20 Jul 2024' } },

    // Vehicles
    { id: 14, label: 'AP-39-AB-1234', type: 'vehicle', details: { 'Plate No': 'AP-39-AB-1234', Make: 'Toyota Innova', Status: 'Stolen',  'Reported Date': '28 Jun 2024', 'Last Seen': 'Tirupati Highway' } },
    { id: 15, label: 'AP-16-CD-5678', type: 'vehicle', details: { 'Plate No': 'AP-16-CD-5678', Make: 'Honda City',    Status: 'Seized',  'Reported Date': '10 Mar 2024', 'Last Seen': 'Guntur Market'   } },
]

export const demoEdges = [
    // Suspect → Crime
    { from: 1, to: 6,  label: 'Accused' },
    { from: 2, to: 6,  label: 'Accomplice' },
    { from: 4, to: 6,  label: 'Accused' },
    { from: 1, to: 7,  label: 'Mastermind' },
    { from: 3, to: 7,  label: 'Financier' },
    { from: 5, to: 7,  label: 'Kingpin' },
    { from: 3, to: 8,  label: 'Accused' },
    { from: 5, to: 8,  label: 'Accused' },

    // Suspect → Suspect
    { from: 1, to: 2,  label: 'Associate',    dashes: true },
    { from: 1, to: 5,  label: 'Reports To' },
    { from: 3, to: 5,  label: 'Reports To' },
    { from: 2, to: 4,  label: 'Known Contact', dashes: true },

    // Suspect → Location
    { from: 1, to: 9,  label: 'Spotted At' },
    { from: 2, to: 10, label: 'Spotted At' },
    { from: 3, to: 11, label: 'Spotted At' },
    { from: 5, to: 9,  label: 'Meeting Point' },

    // Phone connections
    { from: 1, to: 13, label: 'Uses' },
    { from: 2, to: 12, label: 'Uses' },
    { from: 13, to: 12, label: 'Called' },

    // Vehicle connections
    { from: 3, to: 14, label: 'Linked To' },
    { from: 5, to: 15, label: 'Seized From' },
    { from: 14, to: 11, label: 'Found At' },
]

export const NODE_TYPES = {
    suspect:  { color: '#ff4757', label: 'Suspect',        icon: '👤' },
    crime:    { color: '#ffa502', label: 'Crime / Case',   icon: '⚖️' },
    location: { color: '#2ed573', label: 'Location',       icon: '📍' },
    phone:    { color: '#eccc68', label: 'Phone / Device', icon: '📱' },
    vehicle:  { color: '#a55eea', label: 'Vehicle',        icon: '🚗' },
}
