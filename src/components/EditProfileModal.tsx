import React, { useState } from 'react';
import { X, Save, RotateCcw, Plus, Trash2, Check } from 'lucide-react';
import { UserProfile, SocialPlatform } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  platforms: SocialPlatform[];
  onSave: (newProfile: UserProfile, newPlatforms: SocialPlatform[]) => void;
  onReset: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  platforms,
  onSave,
  onReset,
}) => {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [platformsData, setPlatformsData] = useState<SocialPlatform[]>([...platforms]);
  const [activeTab, setActiveTab] = useState<'profile' | 'links'>('profile');

  React.useEffect(() => {
    if (isOpen) {
      setFormData({ ...profile });
      setPlatformsData([...platforms]);
    }
  }, [isOpen, profile, platforms]);

  if (!isOpen) return null;

  const handlePlatformChange = (index: number, field: keyof SocialPlatform, value: string) => {
    const updated = [...platformsData];
    updated[index] = { ...updated[index], [field]: value };
    setPlatformsData(updated);
  };

  const handleAddPlatform = () => {
    const newPlatform: SocialPlatform = {
      id: `custom-${Date.now()}`,
      name: 'New Platform',
      handle: '@arsalan',
      url: 'https://',
      category: 'community',
      description: 'Follow me for updates and latest releases.',
      followersCount: 'Community',
      themeColor: '#6366f1',
      accentBg: 'rgba(99, 102, 241, 0.12)',
      textColor: 'text-indigo-400',
    };
    setPlatformsData([...platformsData, newPlatform]);
  };

  const handleRemovePlatform = (index: number) => {
    const updated = platformsData.filter((_, i) => i !== index);
    setPlatformsData(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, platformsData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-neutral-900 border border-white/15 shadow-2xl text-white overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-950/50">
          <div>
            <h2 className="text-lg font-bold font-display">Customize Your Hub</h2>
            <p className="text-xs text-neutral-400">Update your details, handles, and destination URLs</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-neutral-900">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Profile Info
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('links')}
            className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'links'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Social Media Links ({platformsData.length})
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Bio / Tagline</label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Location / Base</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Avatar Image</label>
                <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, avatarUrl: '/avatar.png?v=virat18' })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      formData.avatarUrl.includes('avatar')
                        ? 'border-white bg-white/20 text-white shadow-sm'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <img src="/avatar.png?v=virat18" alt="Profile" className="w-5 h-5 rounded-full object-cover" />
                    <span>Cricket Photo (Virat 18)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, avatarUrl: '/logo.png' })}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                      formData.avatarUrl === '/logo.png'
                        ? 'border-white bg-white/20 text-white shadow-sm'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <img src="/logo.png" alt="Logo" className="w-5 h-5 rounded-full object-cover" />
                    <span>Website Logo</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={formData.avatarUrl}
                  onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                  placeholder="/avatar.jpg, /logo.png, or URL"
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-400">
                  Configure real URLs for Instagram, YouTube, TikTok, etc.
                </span>
                <button
                  type="button"
                  onClick={handleAddPlatform}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Link
                </button>
              </div>

              <div className="space-y-3">
                {platformsData.map((plat, idx) => (
                  <div
                    key={plat.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1">
                        <span
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: plat.themeColor }}
                        />
                        <input
                          type="text"
                          value={plat.name}
                          onChange={(e) => handlePlatformChange(idx, 'name', e.target.value)}
                          className="font-bold text-sm bg-transparent text-white border-b border-transparent hover:border-white/20 focus:border-white/50 focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePlatform(idx)}
                        title="Delete platform"
                        className="text-neutral-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-neutral-400 block mb-0.5">Handle / Username</label>
                        <input
                          type="text"
                          value={plat.handle}
                          onChange={(e) => handlePlatformChange(idx, 'handle', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-0.5">Destination URL</label>
                        <input
                          type="text"
                          value={plat.url}
                          onChange={(e) => handlePlatformChange(idx, 'url', e.target.value)}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div>
                        <label className="text-neutral-400 block mb-0.5">Community / Followers Metric</label>
                        <input
                          type="text"
                          value={plat.followersCount}
                          onChange={(e) => handlePlatformChange(idx, 'followersCount', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-0.5">Short Description</label>
                        <input
                          type="text"
                          value={plat.description}
                          onChange={(e) => handlePlatformChange(idx, 'description', e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-neutral-200 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer controls */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="save-profile-btn"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-white text-black hover:bg-neutral-200 transition-colors shadow-lg"
              >
                <Save className="w-3.5 h-3.5" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
