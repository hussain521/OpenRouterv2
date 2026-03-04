import type { FC } from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Link, Shield, Percent, Key, Filter, Info, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export type ObservabilityDestination = {
  name: string;
  iconEmoji: string;
};

type NewDestinationPageProps = {
  destination: ObservabilityDestination;
  onBack: () => void;
};

type FilterRule = {
  id: string;
  field?: string;
  operator?: string;
  value?: string;
};

type FilterGroup = {
  id: string;
  rules: FilterRule[];
  matchType: "all" | "any";
};

const createRule = (): FilterRule => ({
  id: `${Date.now()}-${Math.random()}`,
  field: "model",
  operator: "equals",
  value: "",
});

const createGroup = (): FilterGroup => ({
  id: `${Date.now()}-${Math.random()}`,
  rules: [createRule()],
  matchType: "all",
});

const NewDestinationPage: FC<NewDestinationPageProps> = ({ destination, onBack }) => {
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([]);

  const handleAddGroup = () => {
    setFilterGroups((prev) => [...prev, createGroup()]);
  };

  const handleAddRule = (groupId: string) => {
    setFilterGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, rules: [...group.rules, createRule()] }
          : group,
      ),
    );
  };

  const handleRemoveRule = (groupId: string, ruleId: string) => {
    setFilterGroups((prev) =>
      prev
        .map((group) =>
          group.id === groupId
            ? { ...group, rules: group.rules.filter((rule) => rule.id !== ruleId) }
            : group,
        )
        .filter((group) => group.rules.length > 0),
    );
  };

  const handleRuleChange = (
    groupId: string,
    ruleId: string,
    field: keyof Omit<FilterRule, "id">,
    value: string,
  ) => {
    setFilterGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              rules: group.rules.map((rule) =>
                rule.id === ruleId ? { ...rule, [field]: value } : rule,
              ),
            }
          : group,
      ),
    );
  };

  const handleGroupMatchTypeChange = (groupId: string, matchType: "all" | "any") => {
    setFilterGroups((prev) =>
      prev.map((group) =>
        group.id === groupId ? { ...group, matchType } : group,
      ),
    );
  };

  return (
   <TooltipProvider>
    <div className="min-h-screen   flex justify-center  ">
      <Card className="w-full border-none rounded-none shadow-none">
        <CardContent className=" border-none rounded-none  space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-muted-foreground cursor-pointer" onClick={onBack} />
              <div className="flex items-center gap-2">
                <span className="text-2xl">{destination.iconEmoji}</span>
                <h1 className="text-2xl font-semibold">New {destination.name} Destination</h1>
              </div>
            </div>
            <Button className="rounded-xl">Add</Button>
          </div>

          <Separator />

          {/* Connection Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h2 className="font-medium flex items-center gap-2">
                <Link className="w-4 h-4" />
                Connection
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Configure credentials and endpoint. Test the connection before saving.
              </p>
            </div>

            <div className="col-span-9 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Name</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>A friendly name to identify this destination</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input defaultValue={destination.name} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>API Key</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Your Arize API key for authentication</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder="arize_..." type="password" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Space Key</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The space key where traces will be sent</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder="space_..." type="password" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Model ID</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>The model identifier for trace categorization</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder="model_..." />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Base URL (optional)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Custom endpoint URL for self-hosted deployments</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input defaultValue="https://otlp.arize.com" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>Headers (optional)</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Additional HTTP headers in JSON format</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder='{"Authorization": "Bearer token", "X-Custom-Header": "value"}' />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl">
                  Test Connection
                </Button>
                <Button variant="outline" className="rounded-xl">
                  Send Trace
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h2 className="font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Privacy
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Control what data is sent to this destination.
              </p>
            </div>
            <div className="col-span-9 flex items-start gap-3">
              <Checkbox id="privacy" />
              <div>
                <Label htmlFor="privacy" className="font-medium">
                  Privacy Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  When enabled, excludes prompt and completion data from traces.
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Sampling Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h2 className="font-medium flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Sampling
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Control what percentage of traces are sent to this destination.
              </p>
            </div>
            <div className="col-span-9 space-y-2">
              <div className="flex items-center gap-2">
                <Label>Rate</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sampling rate between 0 and 1 (e.g., 0.5 = 50% of traces)</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input type="number" defaultValue={1} />
            </div>
          </div>

          <Separator />

          {/* API Key Filter Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h2 className="font-medium flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Key Filter
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Optionally filter traces by API key.
              </p>
            </div>
            <div className="col-span-9 space-y-2">
              <div className="flex items-center gap-2">
                <Label>API Key Filter (optional)</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send traces only from specific API keys</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input placeholder="Select API keys" />
            </div>
          </div>

          <Separator />

          {/* Filter Rules Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h2 className="font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter Rules
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                Only send traces that match specific criteria.
              </p>
            </div>
            <div className="col-span-9 space-y-4">
              {filterGroups.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No filter rules configured. All traces will be sent to this destination.
                </p>
              )}

              {filterGroups.map((group, groupIndex) => (
                <div key={group.id} className="space-y-2">
                  {groupIndex > 0 && (
                    <div className="text-xs font-medium text-muted-foreground px-1">OR</div>
                  )}
                  <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 py-3 space-y-3">
                    {group.rules.length > 1 && (
                      <div className="flex justify-start">
                        <Select
                          value={group.matchType}
                          onValueChange={(val) =>
                            handleGroupMatchTypeChange(
                              group.id,
                              val === "any" ? "any" : "all",
                            )
                          }
                        >
                          <SelectTrigger size="sm" className="min-w-[160px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All match (AND)</SelectItem>
                            <SelectItem value="any">Any match (OR)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {group.rules.map((rule) => (
                      <div key={rule.id} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 w-full">
                          <Select
                            value={rule.field}
                            onValueChange={(val) =>
                              handleRuleChange(group.id, rule.id, "field", val)
                            }
                          >
                            <SelectTrigger className="min-w-[120px]">
                              <SelectValue placeholder="Field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="model">Model</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={rule.operator}
                            onValueChange={(val) =>
                              handleRuleChange(group.id, rule.id, "operator", val)
                            }
                          >
                            <SelectTrigger className="min-w-[120px]">
                              <SelectValue placeholder="Operator" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="equals">equals</SelectItem>
                              <SelectItem value="not_equals">does not equal</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={rule.value}
                            onValueChange={(val) =>
                              handleRuleChange(group.id, rule.id, "value", val)
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="value-1">Value 1</SelectItem>
                              <SelectItem value="value-2">Value 2</SelectItem>
                            </SelectContent>
                          </Select>

                          <button
                            type="button"
                            className="ml-2 text-red-500 hover:text-red-600"
                            onClick={() => handleRemoveRule(group.id, rule.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                      onClick={() => handleAddRule(group.id)}
                    >
                      <span className="text-base leading-none">+</span>
                      <span>Add Rule</span>
                    </button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={handleAddGroup}
              >
                + Add Filter Rule
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
};
export default NewDestinationPage;