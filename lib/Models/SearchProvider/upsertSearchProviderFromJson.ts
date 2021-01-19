import Terria from "./../Terria";
import ModelFactory from "./../ModelFactory";
import { BaseModel } from "../Model";
import i18next from "i18next";
import TerriaError from "../../Core/TerriaError";
import CommonStrata from "./../CommonStrata";
import updateModelFromJson from "../updateModelFromJson";
import createStubSearchProvider from "./createStubSearchProvider";

export default function upsertSearchProviderFromJson(
  factory: ModelFactory,
  terria: Terria,
  stratumName: string,
  json: any
) {
  let uniqueId = json.id;
  if (uniqueId === undefined) {
    const id = json.localId || json.name;
    if (id === undefined) {
      throw new TerriaError({
        title: i18next.t("models.catalog.idForMatchingErrorTitle"),
        message: i18next.t("models.catalog.idForMatchingErrorMessage")
      });
    }
    uniqueId = id;
  }

  let model = terria.getModelById(BaseModel, uniqueId);

  if (model === undefined) {
    model = factory.create(json.type, uniqueId, terria);
    if (model === undefined) {
      console.log(
        new TerriaError({
          title: i18next.t("models.catalog.unsupportedTypeTitle"),
          message: i18next.t("models.catalog.unsupportedTypeMessage", {
            type: json.type
          })
        })
      );
      model = createStubSearchProvider(terria, uniqueId);
      const stub = model;
      stub.setTrait(CommonStrata.underride, "isExperiencingIssues", true);
      stub.setTrait(CommonStrata.override, "name", `${uniqueId} (Stub)`);
    }

    model?.terria.addSearchProvider(model);
  }

  try {
    updateModelFromJson(model, stratumName, json);
  } catch (error) {
    console.log(`Error updating search provider from JSON`);
    console.log(error);
    model?.setTrait(CommonStrata.underride, "isExperiencingIssues", true);
  }
}
