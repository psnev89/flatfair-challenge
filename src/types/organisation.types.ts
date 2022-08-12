import { Pound } from "./shared.types";

export const enum OrganisationStructureTypeEnum {
  Branch = "branch",
  Area = "area",
  Division = "division",
  // Client ?
}

type OrganisationStructureType = `${OrganisationStructureTypeEnum}`;
type OrganisationUnitConfig = {
  hasFixedMembershipFee: boolean,
  fixedMembershipFeeAmount: Pound
}

export abstract class OrganisationUnit {
  protected belongsTo!: OrganisationUnit | null;
  protected config: OrganisationUnitConfig;
  protected structureType: OrganisationStructureType;
  public name: string;

  constructor(name: string, structureType: OrganisationStructureType, hasFixedFee: boolean, fixedFeeAmount: Pound = 0) {
    this.name = name;
    this.structureType = structureType;
    this.config = {
      hasFixedMembershipFee: hasFixedFee,
      fixedMembershipFeeAmount: fixedFeeAmount
    }
  }

  public getBelongedUnit(): OrganisationUnit | null {
    return this.belongsTo;
  }
  public detachBelongedUnit(): void {
    this.belongsTo = null;
  }
  public attachBelongedUnit(unit: OrganisationUnit): void {
    this.belongsTo = unit;
  }
  public getFixedMembershipFee(): Pound | null {
    if (this.config.hasFixedMembershipFee) return this.config.fixedMembershipFeeAmount;
    return this.belongsTo?.getFixedMembershipFee?.() ?? null;
  }
}

export class SingleOrganisationUnit extends OrganisationUnit {
  public getFixedMembershipFee(): Pound | null {
    if (this.config.hasFixedMembershipFee) return this.config.fixedMembershipFeeAmount;
    return this.belongsTo?.getFixedMembershipFee?.() ?? null;
  }
}

export class CompositeOrganisationUnit extends OrganisationUnit {
  protected units: OrganisationUnit[] = [];

  public addUnit(unit: OrganisationUnit): void {
    this.units.push(unit);
    unit.attachBelongedUnit(this);
  }
  public removeUnit(unit: OrganisationUnit): void {
    const indexToRemove = this.units.indexOf(unit);
    this.units.splice(indexToRemove, 1);
    unit.detachBelongedUnit();
  }
}