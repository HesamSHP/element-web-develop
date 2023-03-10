/*
Copyright 2022 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Action } from "../../../src/dispatcher/actions";
import dis from "../../../src/dispatcher/dispatcher";
import UseSystemFontController from "../../../src/settings/controllers/UseSystemFontController";
import { SettingLevel } from "../../../src/settings/SettingLevel";
import SettingsStore from "../../../src/settings/SettingsStore";

const dispatchSpy = jest.spyOn(dis, "dispatch");

describe("UseSystemFontController", () => {
    it("dispatches a font size action on change", () => {
        const getValueSpy = jest.spyOn(SettingsStore, "getValue").mockReturnValue(12);
        const controller = new UseSystemFontController();

        controller.onChange(SettingLevel.ACCOUNT, "$room:server", true);

        expect(dispatchSpy).toHaveBeenCalledWith({
            action: Action.UpdateSystemFont,
            useSystemFont: true,
            font: 12,
        });

        expect(getValueSpy).toHaveBeenCalledWith("systemFont");
    });
});
