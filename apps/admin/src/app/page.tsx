import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Intare Travels Admin</h1>
          <p className="text-neutral-600">Manage your tourism platform content</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/tours" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🗺️</div>
            <h2 className="text-xl font-bold mb-2">Tours</h2>
            <p className="text-neutral-600 mb-4">Add, edit, and manage tour packages</p>
            <span className="text-primary-700 font-medium">Manage Tours →</span>
          </Link>

          <Link href="/apartments" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🏠</div>
            <h2 className="text-xl font-bold mb-2">Apartments</h2>
            <p className="text-neutral-600 mb-4">Manage accommodation listings</p>
            <span className="text-primary-700 font-medium">Manage Apartments →</span>
          </Link>

          <Link href="/promotions" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">✈️</div>
            <h2 className="text-xl font-bold mb-2">Flight Promotions</h2>
            <p className="text-neutral-600 mb-4">Update ticket deals and partners</p>
            <span className="text-primary-700 font-medium">Manage Promotions →</span>
          </Link>

          <Link href="/partners" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🤝</div>
            <h2 className="text-xl font-bold mb-2">Airline Partners</h2>
            <p className="text-neutral-600 mb-4">Manage airline partnerships</p>
            <span className="text-primary-700 font-medium">Manage Partners →</span>
          </Link>

          <Link href="/uploads" className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">📸</div>
            <h2 className="text-xl font-bold mb-2">Media Upload</h2>
            <p className="text-neutral-600 mb-4">Upload images and files</p>
            <span className="text-primary-700 font-medium">Upload Files →</span>
          </Link>

          <a href="https://intaretravels.rw" target="_blank" className="bg-primary-700 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">🌐</div>
            <h2 className="text-xl font-bold mb-2">View Website</h2>
            <p className="text-primary-100 mb-4">Open public website</p>
            <span className="font-medium">Visit Site →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
