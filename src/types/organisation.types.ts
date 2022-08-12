import { Pence, Pound } from "./shared.types";

interface IOrganisationUnitConfig {
  hasFixedMembershipFee: boolean,
  fixedMembershipFeeAmount: number
}

class OrganisationUnitConfig implements IOrganisationUnitConfig {
  hasFixedMembershipFee: boolean;
  fixedMembershipFeeAmount: Pound;

  constructor(fixedMembershipFeeAmount: Pound = 0, hasFixedMembershipFee: boolean = true) {
    this.hasFixedMembershipFee = hasFixedMembershipFee;
    this.fixedMembershipFeeAmount = fixedMembershipFeeAmount;
  }
}

interface IOrganisationUnit {
  name: string,
  config: IOrganisationUnitConfig
}

export class OrganisationUnit implements IOrganisationUnit {
  name: string;
  config: OrganisationUnitConfig;

  constructor(name: string, fixedMembershipFeeAmount: Pound) {
    this.name = name;
    this.config = new OrganisationUnitConfig(fixedMembershipFeeAmount);
  }

  toggleFixedMembershipFee() {
    this.config.hasFixedMembershipFee = !this.config.hasFixedMembershipFee;
  }
}