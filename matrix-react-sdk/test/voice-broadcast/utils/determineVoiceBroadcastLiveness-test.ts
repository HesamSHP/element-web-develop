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

import { VoiceBroadcastInfoState, VoiceBroadcastLiveness } from "../../../src/voice-broadcast";
import { determineVoiceBroadcastLiveness } from "../../../src/voice-broadcast/utils/determineVoiceBroadcastLiveness";

const testData: Array<{ state: VoiceBroadcastInfoState; expected: VoiceBroadcastLiveness }> = [
    { state: VoiceBroadcastInfoState.Started, expected: "live" },
    { state: VoiceBroadcastInfoState.Resumed, expected: "live" },
    { state: VoiceBroadcastInfoState.Paused, expected: "grey" },
    { state: VoiceBroadcastInfoState.Stopped, expected: "not-live" },
];

describe("determineVoiceBroadcastLiveness", () => {
    it.each(testData)("should return the expected value for a %s broadcast", ({ state, expected }) => {
        expect(determineVoiceBroadcastLiveness(state)).toBe(expected);
    });

    it("should return »non-live« for an undefined state", () => {
        // @ts-ignore
        expect(determineVoiceBroadcastLiveness(undefined)).toBe("not-live");
    });

    it("should return »non-live« for an unknown state", () => {
        // @ts-ignore
        expect(determineVoiceBroadcastLiveness("unknown test state")).toBe("not-live");
    });
});
