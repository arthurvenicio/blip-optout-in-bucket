export type CommandsResponse = {
  type: string;
  resource: {
    template_list?: Template[];
    OptoutedContacts?: any;
  };
  method: string;
  status: string;
  id: string;
  from: string;
  to: string;
  metadata: any;
};

export type Template = {
  template_name: string;
  template_version: string;
  notification_response_state_id: string;
  flow_id: string;
  has_parameters: boolean;
  fixed_parameters?: string[];
};

export type OptoutedAtT = {
  OptoutedAt: string;
};

export type ArrayOfOptOut = {
  number: string;
  OptoutedAt: string;
};
