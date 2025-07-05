import { useState } from 'react';
import { TableType } from '@/hooks/useTablesData';
import { SocialMetricsData, ContentData, AccountData } from '@/lib/mock-data';

type TableRecord = SocialMetricsData | ContentData | AccountData;

// Definición de tipo para los datos del formulario
type FormDataType = Record<string, any>;

interface DataTableProps {
  activeTable: TableType;
  data: TableRecord[];
  deleteRecord: (id: string) => Promise<void>;
  updateRecord: (id: string, updatedData: Record<string, unknown>) => Promise<TableRecord | null>;
}

export const DataTable = ({ activeTable, data, deleteRecord, updateRecord }: DataTableProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<FormDataType>({});

  const handleEditClick = (record: TableRecord) => {
    setEditingId(record.id);
    // Convertir el registro a FormDataType
    setEditFormData(record as FormDataType);
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      await updateRecord(editingId, editFormData);
      setEditingId(null);
      setEditFormData({});
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleInputChange = (field: string, value: any) => {
    setEditFormData({ ...editFormData, [field]: value });
  };

  if (activeTable === 'metrics') {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-neutral/20">
          <thead className="bg-neutral/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Followers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Engagement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Posts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Reach</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Impressions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral/20">
            {(data as SocialMetricsData[]).map((item) => (
              <tr key={item.id} className="hover:bg-neutral/5">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="date"
                      value={editFormData.date || ''}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    new Date(item.date).toLocaleDateString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <select
                      value={editFormData.platform || ''}
                      onChange={(e) => handleInputChange('platform', e.target.value)}
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select platform</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="X">X</option>
                      <option value="TikTok">TikTok</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      {item.platform}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.followers || ''}
                      onChange={(e) => handleInputChange('followers', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.followers.toLocaleString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={editFormData.engagement || ''}
                      onChange={(e) => handleInputChange('engagement', parseFloat(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    `${item.engagement.toFixed(1)}%`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.posts || ''}
                      onChange={(e) => handleInputChange('posts', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.posts
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.reach || ''}
                      onChange={(e) => handleInputChange('reach', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.reach.toLocaleString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.impressions || ''}
                      onChange={(e) => handleInputChange('impressions', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.impressions.toLocaleString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (activeTable === 'content') {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-neutral/20">
          <thead className="bg-neutral/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Likes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Engagement</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral/20">
            {(data as ContentData[]).map((item) => (
              <tr key={item.id} className="hover:bg-neutral/5">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-medium">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editFormData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.title
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <select
                      value={editFormData.platform || ''}
                      onChange={(e) => handleInputChange('platform', e.target.value)}
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select platform</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="X">X</option>
                      <option value="TikTok">TikTok</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      {item.platform}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <select
                      value={editFormData.type || ''}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select type</option>
                      <option value="Post">Post</option>
                      <option value="Video">Video</option>
                      <option value="Image">Image</option>
                      <option value="Carousel">Carousel</option>
                      <option value="Story">Story</option>
                      <option value="Reel">Reel</option>
                      <option value="Tweet">Tweet</option>
                    </select>
                  ) : (
                    item.type
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="date"
                      value={editFormData.publishDate || ''}
                      onChange={(e) => handleInputChange('publishDate', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    new Date(item.publishDate).toLocaleDateString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.likes || ''}
                      onChange={(e) => handleInputChange('likes', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.likes.toLocaleString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      step="0.1"
                      value={editFormData.engagement_rate || ''}
                      onChange={(e) => handleInputChange('engagement_rate', parseFloat(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    `${item.engagement_rate.toFixed(1)}%`
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <select
                      value={editFormData.status || ''}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select status</option>
                      <option value="Published">Published</option>
                      <option value="Scheduled">Scheduled</option>
                      <option value="Draft">Draft</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'Published' ? 'bg-green-100 text-green-800' : 
                      item.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (activeTable === 'accounts') {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-neutral/20">
          <thead className="bg-neutral/10">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Platform</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Followers</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Following</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Posts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Verified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral/20">
            {(data as AccountData[]).map((item) => (
              <tr key={item.id} className="hover:bg-neutral/5">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <select
                      value={editFormData.platform || ''}
                      onChange={(e) => handleInputChange('platform', e.target.value)}
                      className="w-full p-1 border rounded"
                    >
                      <option value="">Select platform</option>
                      <option value="Instagram">Instagram</option>
                      <option value="Facebook">Facebook</option>
                      <option value="X">X</option>
                      <option value="TikTok">TikTok</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="YouTube">YouTube</option>
                    </select>
                  ) : (
                    <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      {item.platform}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editFormData.username || ''}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full p-1 border rounded"
                      placeholder="@username"
                    />
                  ) : (
                    item.username
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={editFormData.displayName || ''}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.displayName
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.followers || ''}
                      onChange={(e) => handleInputChange('followers', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.followers.toLocaleString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.following || ''}
                      onChange={(e) => handleInputChange('following', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.following.toLocaleString()
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      value={editFormData.posts || ''}
                      onChange={(e) => handleInputChange('posts', parseInt(e.target.value))}
                      className="w-full p-1 border rounded"
                    />
                  ) : (
                    item.posts
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <select
                      value={editFormData.verified ? 'true' : 'false'}
                      onChange={(e) => handleInputChange('verified', e.target.value === 'true')}
                      className="w-full p-1 border rounded"
                    >
                      <option value="true">Verified</option>
                      <option value="false">Not verified</option>
                    </select>
                  ) : (
                    item.verified ? (
                      <span className="text-blue-600">✓ Verified</span>
                    ) : (
                      <span className="text-gray-500">Not verified</span>
                    )
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <select
                      value={editFormData.isActive ? 'true' : 'false'}
                      onChange={(e) => handleInputChange('isActive', e.target.value === 'true')}
                      className="w-full p-1 border rounded"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {editingId === item.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 hover:text-green-800 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteRecord(item.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}; 