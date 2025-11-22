import { DashboardShell } from '@/components/dashboard-shell';
import { CDPConfigurationCard } from '@/components/settings/cdp-configuration-card';
import { OrganizationCard } from '@/components/settings/organization-card';
import { ResourcesCard } from '@/components/settings/resources-card';
import { SettingsHeader } from '@/components/settings/settings-header';

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <SettingsHeader />
        <OrganizationCard />
        <CDPConfigurationCard />
        <ResourcesCard />
      </div>
    </DashboardShell>
  );
}
