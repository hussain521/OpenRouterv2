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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
                <h1 className="text-2xl font-semibold">{t("observability.newDestination", { name: destination.name })}</h1>
              </div>
            </div>
            <Button className="rounded-xl">{t("common.add")}</Button>
          </div>

          <Separator />

          {/* Connection Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h2 className="font-medium flex items-center gap-2">
                <Link className="w-4 h-4" />
                {t("observability.connection")}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {t("observability.connectionDescription")}
              </p>
            </div>

            <div className="col-span-9 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{t("common.name")}</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("observability.nameTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input defaultValue={destination.name} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{t("observability.apiKey")}</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("observability.apiKeyTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder="arize_..." type="password" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{t("observability.spaceKey")}</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("observability.spaceKeyTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder="space_..." type="password" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{t("observability.modelId")}</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("observability.modelIdTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder="model_..." />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{t("observability.baseUrl")}</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("observability.baseUrlTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input defaultValue="https://otlp.arize.com" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label>{t("observability.headers")}</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{t("observability.headersTooltip")}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input placeholder='{"Authorization": "Bearer token", "X-Custom-Header": "value"}' />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="rounded-xl">
                  {t("observability.testConnection")}
                </Button>
                <Button variant="outline" className="rounded-xl">
                  {t("observability.sendTrace")}
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
                {t("observability.privacy")}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {t("observability.privacyDescription")}
              </p>
            </div>
            <div className="col-span-9 flex items-start gap-3">
              <Checkbox id="privacy" />
              <div>
                <Label htmlFor="privacy" className="font-medium">
                  {t("observability.privacyMode")}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {t("observability.privacyModeDescription")}
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
                {t("observability.sampling")}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {t("observability.samplingDescription")}
              </p>
            </div>
            <div className="col-span-9 space-y-2">
              <div className="flex items-center gap-2">
                <Label>{t("observability.rate")}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("observability.rateTooltip")}</p>
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
                {t("observability.apiKeyFilter")}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {t("observability.apiKeyFilterDescription")}
              </p>
            </div>
            <div className="col-span-9 space-y-2">
              <div className="flex items-center gap-2">
                <Label>{t("observability.apiKeyFilterOptional")}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 text-muted-foreground hover:text-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("observability.apiKeyFilterTooltip")}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input placeholder={t("observability.selectApiKeys")} />
            </div>
          </div>

          <Separator />

          {/* Filter Rules Section */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-3">
              <h2 className="font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {t("observability.filterRules")}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {t("observability.filterRulesDescription")}
              </p>
            </div>
            <div className="col-span-9 space-y-4">
              {filterGroups.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  {t("observability.noFilterRules")}
                </p>
              )}

              {filterGroups.map((group, groupIndex) => (
                <div key={group.id} className="space-y-2">
                  {groupIndex > 0 && (
                    <div className="text-xs font-medium text-muted-foreground px-1">{t("common.or").toUpperCase()}</div>
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
                          <SelectContent align="start">
                            <SelectItem value="all">{t("observability.allMatch")}</SelectItem>
                            <SelectItem value="any">{t("observability.anyMatch")}</SelectItem>
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
                              <SelectValue placeholder={t("observability.field")} />
                            </SelectTrigger>
                            <SelectContent align="start">
                              <SelectItem value="model">{t("observability.model")}</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={rule.operator}
                            onValueChange={(val) =>
                              handleRuleChange(group.id, rule.id, "operator", val)
                            }
                          >
                            <SelectTrigger className="min-w-[120px]">
                              <SelectValue placeholder={t("observability.operator")} />
                            </SelectTrigger>
                            <SelectContent align="start">
                              <SelectItem value="equals">{t("observability.equals")}</SelectItem>
                              <SelectItem value="not_equals">{t("observability.notEquals")}</SelectItem>
                            </SelectContent>
                          </Select>

                          <Select
                            value={rule.value}
                            onValueChange={(val) =>
                              handleRuleChange(group.id, rule.id, "value", val)
                            }
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder={t("common.select")} />
                            </SelectTrigger>
                            <SelectContent align="start">
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
                      <span>{t("observability.addRule")}</span>
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
                + {t("observability.addFilterRule")}
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