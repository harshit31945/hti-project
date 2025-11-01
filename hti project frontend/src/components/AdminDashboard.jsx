import React, { useEffect, useState } from 'react'

export default function AdminDashboard(){
  const [summary,setSummary]=useState(null)
  const [children,setChildren]=useState([])
  const [selectedChild,setSelectedChild]=useState(null)
  const [loading,setLoading]=useState(true)
  const [error,setError]=useState(null)

  const mockSummary={
    totalMembers:124,
    totalChildren:60,
    totalParents:58,
    devicesOnline:48,
    hazardZones:12,
    activeAlerts:2
  }

  const mockChildren=[
    {
      id:'C001',
      firstName:'Aarav',
      lastName:'Shah',
      dob:'2018-05-12',
      age:7,
      school:'Greenwood Intl',
      medicalInfo:'None',
      homeLocation:'Block A, Flat 12',
      lastGps:{lat:28.6139,lng:77.209, timestamp:'2025-10-29T15:12:00Z'},
      lastAlert:null,
      registeredAt:'2025-01-10T09:30:00Z',
      deviceId:'D1001',
      parents:[{id:'P01',firstName:'Rohit',lastName:'Shah',email:'rohit@example.com',phone:'+91-9876543210',address:'Flat 12, Block A',lastLoginAt:'2025-10-29T13:00:00Z'}]
    },
    {
      id:'C002',
      firstName:'Maya',
      lastName:'Kumar',
      dob:'2017-11-02',
      age:8,
      school:'St Marys',
      medicalInfo:'Peanut allergy',
      homeLocation:'Block B, Flat 3',
      lastGps:{lat:28.6145,lng:77.205, timestamp:'2025-10-30T07:45:00Z'},
      lastAlert:{type:'hazard_zone',message:'Near solar fence'},
      registeredAt:'2025-02-22T11:00:00Z',
      deviceId:'D1002',
      parents:[{id:'P02',firstName:'Neha',lastName:'Kumar',email:'neha@example.com',phone:'+91-9123456780',address:'Flat 3, Block B',lastLoginAt:'2025-10-30T06:50:00Z'}]
    }
  ]

  useEffect(()=>{
    async function load(){
      setLoading(true)
      try{
        const s=await fetch('/api/admin/summary').then(r=>r.ok? r.json():null).catch(()=>null)
        const ch=await fetch('/api/admin/children').then(r=>r.ok? r.json():null).catch(()=>null)
        setSummary(s||mockSummary)
        setChildren(ch&&Array.isArray(ch)&&ch.length?ch:mockChildren)
      }catch(e){
        setError('Failed to load data')
        setSummary(mockSummary)
        setChildren(mockChildren)
      }finally{setLoading(false)}
    }
    load()
  },[])

  function formatDate(iso){
    try{return new Date(iso).toLocaleString()}catch(e){return iso}
  }

  function openChild(child){setSelectedChild(child)}
  function closeModal(){setSelectedChild(null)}

  function exportCSV(){
    const headers=["Child ID","Name","DOB","Age","School","Medical Info","Home Location","Device ID","Last GPS Lat","Last GPS Lng","Last Seen"]
    const rows=children.map(c=>[
      c.id,
      `${c.firstName} ${c.lastName}`,
      c.dob||'',
      c.age||'',
      c.school||'',
      c.medicalInfo||'',
      c.homeLocation||'',
      c.deviceId||'',
      c.lastGps?.lat||'',
      c.lastGps?.lng||'',
      c.lastGps?.timestamp? formatDate(c.lastGps.timestamp):''
    ])
    const csv=[headers.join(','),...rows.map(r=>r.map(cell=>`"${String(cell).replace(/"/g,'""')}"`).join(','))].join('\n')
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a')
    a.href=url
    a.download='children_export.csv'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold">🛠️ Admin Dashboard</h1>
        <div className="flex gap-3">
          <button onClick={exportCSV} className="px-4 py-2 bg-blue-600 text-white rounded">Export CSV</button>
          <button
            onClick={() => {
              localStorage.removeItem("user")
              window.location.href = "/login"
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Members</div>
            <div className="text-2xl font-bold">{summary? summary.totalMembers:'-'}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Children Registered</div>
            <div className="text-2xl font-bold">{summary? summary.totalChildren:'-'}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Parents Registered</div>
            <div className="text-2xl font-bold">{summary? summary.totalParents:'-'}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Devices Online</div>
            <div className="text-2xl font-bold">{summary? summary.devicesOnline:'-'}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Hazard Zones</div>
            <div className="text-2xl font-bold">{summary? summary.hazardZones:'-'}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Active Alerts</div>
            <div className="text-2xl font-bold">{summary? summary.activeAlerts:'-'}</div>
          </div>
        </div>

        <div className="bg-white rounded shadow p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Children</h2>
            <div className="text-sm text-gray-500">{loading? 'Loading...': `${children.length} records`}</div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Age</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">School</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Home</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Device</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Last Seen</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Alert</th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {children.map(child=> (
                  <tr key={child.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{child.id}</td>
                    <td className="px-4 py-2 text-sm">{child.firstName} {child.lastName}</td>
                    <td className="px-4 py-2 text-sm">{child.age}</td>
                    <td className="px-4 py-2 text-sm">{child.school}</td>
                    <td className="px-4 py-2 text-sm">{child.homeLocation}</td>
                    <td className="px-4 py-2 text-sm">{child.deviceId}</td>
                    <td className="px-4 py-2 text-sm">{child.lastGps?.timestamp? formatDate(child.lastGps.timestamp):'—'}</td>
                    <td className="px-4 py-2 text-sm">{child.lastAlert? child.lastAlert.message:'—'}</td>
                    <td className="px-4 py-2 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={()=>openChild(child)} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">View</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedChild && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-medium">{selectedChild.firstName} {selectedChild.lastName}</h3>
                <button onClick={closeModal} className="text-gray-500">Close</button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Child ID</div>
                  <div className="font-medium">{selectedChild.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">DOB</div>
                  <div className="font-medium">{selectedChild.dob}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Age</div>
                  <div className="font-medium">{selectedChild.age}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">School</div>
                  <div className="font-medium">{selectedChild.school}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500">Medical Info</div>
                  <div className="font-medium">{selectedChild.medicalInfo||'—'}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-500">Home Location</div>
                  <div className="font-medium">{selectedChild.homeLocation}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Device ID</div>
                  <div className="font-medium">{selectedChild.deviceId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Last Seen</div>
                  <div className="font-medium">{selectedChild.lastGps?.timestamp? formatDate(selectedChild.lastGps.timestamp):'—'}</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-md font-semibold mb-2">Parents / Guardians</h4>
                <div className="space-y-3">
                  {selectedChild.parents.map(p=> (
                    <div key={p.id} className="p-3 bg-gray-50 rounded">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{p.firstName} {p.lastName}</div>
                          <div className="text-sm text-gray-500">{p.email}</div>
                          <div className="text-sm text-gray-500">{p.phone}</div>
                        </div>
                        <div className="text-sm text-gray-500">Last login: {p.lastLoginAt? formatDate(p.lastLoginAt):'—'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button onClick={closeModal} className="px-4 py-2 bg-gray-200 rounded">Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
