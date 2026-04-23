// Demo data representing a fictional AP crime network (all data is fictional for demonstration)
export const demoNodes = [
    // Suspects
    { id: 1, label: 'Ravi Kumar', type: 'suspect', details: { role: 'Primary Suspect', age: 34, location: 'Vijayawada', cases: ['Case #2024-001', 'Case #2024-045'], status: 'Under Investigation' } },
    { id: 2, label: 'Venkat Rao', type: 'suspect', details: { role: 'Associate', age: 29, location: 'Guntur', cases: ['Case #2024-001'], status: 'Absconding' } },
    { id: 3, label: 'Suresh Babu', type: 'suspect', details: { role: 'Financier', age: 47, location: 'Visakhapatnam', cases: ['Case #2024-045', 'Case #2024-123'], status: 'Arrested' } },
    { id: 4, label: 'Priya Sharma', type: 'suspect', details: { role: 'Associate', age: 26, location: 'Nellore', cases: ['Case #2024-001'], status: 'Under Investigation' } },
    { id: 5, label: 'Mohan Reddy', type: 'suspect', details: { role: 'Kingpin', age: 52, location: 'Unknown', cases: ['Case #2024-045', 'Case #2024-123'], status: 'Wanted' } },

    // Crimes
    { id: 6, label: 'Phone Scam\n#2024-001', type: 'crime', details: { caseNo: '#2024-001', type: 'Cybercrime', date: '12 Jan 2024', amount: '₹18.5 Lakhs', status: 'Active', section: 'IT Act 66D' } },
    { id: 7, label: 'Bank Fraud\n#2024-045', type: 'crime', details: { caseNo: '#2024-045', type: 'Financial Fraud', date: '03 Mar 2024', amount: '₹2.3 Crores', status: 'Under Trial', section: 'IPC 420' } },
    { id: 8, label: 'Vehicle Theft\n#2024-123', type: 'crime', details: { caseNo: '#2024-123', type: 'Property Crime', date: '28 Jun 2024', amount: 'N/A', status: 'Active', section: 'IPC 379' } },

    // Locations
    { id: 9, label: 'Vijayawada\nJunction', type: 'location', details: { city: 'Vijayawada', district: 'Krishna', significance: 'Primary meeting point', visits: 14 } },
    { id: 10, label: 'Guntur\nMarket', type: 'location', details: { city: 'Guntur', district: 'Guntur', significance: 'Transaction location', visits: 7 } },
    { id: 11, label: 'Tirupati\nHighway', type: 'location', details: { city: 'Tirupati', district: 'Chittoor', significance: 'Vehicle handover point', visits: 3 } },

    // Phones
    { id: 12, label: '+91-98***-1234\n(Burner)', type: 'phone', details: { number: '+91-98***-1234', type: 'Burner Phone', calls: 47, registeredTo: 'Unknown', lastSeen: '15 Jul 2024' } },
    { id: 13, label: '+91-76***-5678\n(Primary)', type: 'phone', details: { number: '+91-76***-5678', type: 'Registered', calls: 112, registeredTo: 'Ravi Kumar', lastSeen: '20 Jul 2024' } },

    // Vehicles
    { id: 14, label: 'AP-39-AB-1234\n(Stolen)', type: 'vehicle', details: { plate: 'AP-39-AB-1234', make: 'Toyota Innova', status: 'Stolen', reportedDate: '28 Jun 2024', lastSeen: 'Tirupati Highway' } },
    { id: 15, label: 'AP-16-CD-5678', type: 'vehicle', details: { plate: 'AP-16-CD-5678', make: 'Honda City', status: 'Seized', reportedDate: '10 Mar 2024', lastSeen: 'Guntur Market' } },
]

export const demoEdges = [
    // Suspect-Crime connections
    { from: 1, to: 6, label: 'Accused', arrows: 'to' },
    { from: 2, to: 6, label: 'Accomplice', arrows: 'to' },
    { from: 4, to: 6, label: 'Accused', arrows: 'to' },
    { from: 1, to: 7, label: 'Mastermind', arrows: 'to' },
    { from: 3, to: 7, label: 'Financier', arrows: 'to' },
    { from: 5, to: 7, label: 'Kingpin', arrows: 'to' },
    { from: 3, to: 8, label: 'Accused', arrows: 'to' },
    { from: 5, to: 8, label: 'Accused', arrows: 'to' },

    // Suspect-Suspect (known associates)
    { from: 1, to: 2, label: 'Associate', arrows: 'to, from', dashes: true },
    { from: 1, to: 5, label: 'Reports To', arrows: 'to' },
    { from: 3, to: 5, label: 'Reports To', arrows: 'to' },
    { from: 2, to: 4, label: 'Known Contact', arrows: 'to, from', dashes: true },

    // Suspect-Location connections
    { from: 1, to: 9, label: 'Spotted At', arrows: 'to' },
    { from: 2, to: 10, label: 'Spotted At', arrows: 'to' },
    { from: 3, to: 11, label: 'Spotted At', arrows: 'to' },
    { from: 5, to: 9, label: 'Meeting Point', arrows: 'to' },

    // Phone connections
    { from: 1, to: 13, label: 'Uses', arrows: 'to' },
    { from: 2, to: 12, label: 'Uses', arrows: 'to' },
    { from: 13, to: 12, label: 'Called', arrows: 'to' },

    // Vehicle connections
    { from: 3, to: 14, label: 'Linked To', arrows: 'to' },
    { from: 5, to: 15, label: 'Seized From', arrows: 'to' },
    { from: 14, to: 11, label: 'Found At', arrows: 'to' },
]

export const NODE_TYPES = {
    suspect: { color: '#ff4757', label: '🔴 Suspect', icon: '👤' },
    crime: { color: '#ffa502', label: '🟠 Crime / Case', icon: '⚖️' },
    location: { color: '#2ed573', label: '🟢 Location', icon: '📍' },
    phone: { color: '#eccc68', label: '🟡 Phone / Device', icon: '📱' },
    vehicle: { color: '#a55eea', label: '🟣 Vehicle', icon: '🚗' },
}
