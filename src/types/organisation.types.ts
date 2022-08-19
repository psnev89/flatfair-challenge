/**
 * Composite based on https://refactoring.guru/design-patterns/composite/typescript/example#lang-features
 * Could have done Composite the default way (abstract class, composite class and leaf class) but for scalable and SOC reasons, decided to split into different structure types (branch | area | division)
 */

import { Pence } from "./shared.types";

const enum OrganisationUnitTypeEnum {
  Branch = "branch",
  Area = "area",
  Division = "division"
  // Client?
}
type OrganisationUnitType = `${OrganisationUnitTypeEnum}`;

type OrganisationUnitConfig = {
  hasFixedMembershipFee: boolean,
  fixedMembershipFeeAmount: Pence
}

export abstract class OrganisationUnit {
  protected belongsTo!: OrganisationUnit | null;
  protected config: OrganisationUnitConfig;
  protected abstract unitType: OrganisationUnitType;
  public name: string;

  constructor(name: string, hasFixedFee: boolean, fixedFeeAmount: Pence = 0) {
    this.name = name;
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

  abstract attachBelongedUnit(unit: OrganisationUnit): void

  public getFixedMembershipFee(): Pence | null {
    if (this.config.hasFixedMembershipFee) return this.config.fixedMembershipFeeAmount;
    return this.belongsTo?.getFixedMembershipFee?.() ?? null;
  }
}

export class BranchUnit extends OrganisationUnit {
  protected unitType: OrganisationUnitType = OrganisationUnitTypeEnum.Branch;

  public attachBelongedUnit(unit: AreaUnit): void {
    this.belongsTo = unit;
  }
}

export class AreaUnit extends OrganisationUnit {
  protected units: BranchUnit[] = [];
  protected unitType: OrganisationUnitType = OrganisationUnitTypeEnum.Area;

  public attachBelongedUnit(unit: DivisionUnit): void {
    this.belongsTo = unit;
  }

  public addUnit(unit: BranchUnit): void {
    this.units.push(unit);
    unit.attachBelongedUnit(this);
  }

  public removeUnit(unit: BranchUnit): void {
    const indexToRemove = this.units.indexOf(unit);
    this.units.splice(indexToRemove, 1);
    unit.detachBelongedUnit();
  }
}

export class DivisionUnit extends OrganisationUnit {
  protected units: AreaUnit[] = [];
  protected unitType: OrganisationUnitType = OrganisationUnitTypeEnum.Division;

  public attachBelongedUnit(): void {
    throw new TypeError("Division unit does not have a parent unit");
  }

  public addUnit(unit: AreaUnit): void {
    this.units.push(unit);
    unit.attachBelongedUnit(this);
  }

  public removeUnit(unit: AreaUnit): void {
    const indexToRemove = this.units.indexOf(unit);
    this.units.splice(indexToRemove, 1);
    unit.detachBelongedUnit();
  }
}