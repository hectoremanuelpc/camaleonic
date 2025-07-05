export const InfoPanel = () => {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-8 border border-neutral/20">
      <h2 className="text-2xl font-bold gradient-text mb-6">
        Social Media Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold text-foreground mb-3">Implemented Features:</h4>
          <ul className="space-y-2 text-foreground/70">
            <li>✅ Platform and date filters</li>
            <li>✅ Followers growth over time</li>
            <li>✅ Period engagement analysis</li>
            <li>✅ Platform distribution</li>
            <li>✅ Reach and impressions metrics</li>
            <li>✅ Real-time calculated statistics</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3">Analyzed Metrics:</h4>
          <ul className="space-y-2 text-foreground/70">
            <li>👥 Followers by platform</li>
            <li>💬 Engagement and interactions</li>
            <li>📈 Reach and impressions</li>
            <li>📱 Instagram, Facebook, X, TikTok</li>
            <li>💼 LinkedIn and YouTube</li>
            <li>📅 Temporal and comparative analysis</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 