export const InfoPanel = () => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-lg p-6 border border-neutral/20">
      <h2 className="text-2xl font-bold gradient-text mb-4">
        Social Media Management System
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-semibold text-foreground mb-3">📊 Metrics:</h4>
          <ul className="space-y-2 text-foreground/70">
            <li>• Follower tracking</li>
            <li>• Engagement analysis</li>
            <li>• Reach metrics</li>
            <li>• Impression tracking</li>
            <li>• Platform data</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">📝 Content:</h4>
          <ul className="space-y-2 text-foreground/70">
            <li>• Post management</li>
            <li>• Content status</li>
            <li>• Interaction metrics</li>
            <li>• Content types</li>
            <li>• Post scheduling</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">👤 Accounts:</h4>
          <ul className="space-y-2 text-foreground/70">
            <li>• Multi-platform management</li>
            <li>• Verification status</li>
            <li>• Account categories</li>
            <li>• Connection tracking</li>
            <li>• Activity control</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 