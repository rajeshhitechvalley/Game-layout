import { useState } from 'react';

const AppearanceTabs = () => {
    const [activeTab, setActiveTab] = useState('theme');

    const tabs = [
        { id: 'theme', label: 'Theme' },
        { id: 'colors', label: 'Colors' },
        { id: 'typography', label: 'Typography' },
    ];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="border-b border-border">
                <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
                {activeTab === 'theme' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
                        <p className="text-muted-foreground">
                            Customize your theme preferences here.
                        </p>
                    </div>
                )}
                
                {activeTab === 'colors' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Color Settings</h3>
                        <p className="text-muted-foreground">
                            Adjust color schemes and preferences.
                        </p>
                    </div>
                )}
                
                {activeTab === 'typography' && (
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Typography Settings</h3>
                        <p className="text-muted-foreground">
                            Configure font settings and text styles.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppearanceTabs;
