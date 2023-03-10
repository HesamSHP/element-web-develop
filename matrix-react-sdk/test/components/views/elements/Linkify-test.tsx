/*
Copyright 2021 The Matrix.org Foundation C.I.C.

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

import { fireEvent, render } from "@testing-library/react";
import React, { useState } from "react";

import { Linkify } from "../../../../src/components/views/elements/Linkify";

describe("Linkify", () => {
    it("linkifies the context", () => {
        const { container } = render(<Linkify>https://perdu.com</Linkify>);
        expect(container.innerHTML).toBe(
            '<div><a href="https://perdu.com" class="linkified" target="_blank" rel="noreferrer noopener">' +
                "https://perdu.com" +
                "</a></div>",
        );
    });

    it("correctly linkifies a room alias", () => {
        const { container } = render(<Linkify>#element-web:matrix.org</Linkify>);
        expect(container.innerHTML).toBe(
            "<div>" +
                '<a href="https://matrix.to/#/#element-web:matrix.org" class="linkified" rel="noreferrer noopener">' +
                "#element-web:matrix.org" +
                "</a></div>",
        );
    });

    it("changes the root tag name", () => {
        const TAG_NAME = "p";

        const { container } = render(<Linkify as={TAG_NAME}>Hello world!</Linkify>);

        expect(container.querySelectorAll("p")).toHaveLength(1);
    });

    it("relinkifies on update", () => {
        function DummyTest() {
            const [n, setN] = useState(0);
            function onClick() {
                setN(n + 1);
            }

            // upon clicking the element, change the content, and expect
            // linkify to update
            return (
                <div onClick={onClick}>
                    <Linkify>{n % 2 === 0 ? "https://perdu.com" : "https://matrix.org"}</Linkify>
                </div>
            );
        }

        const { container } = render(<DummyTest />);

        expect(container.innerHTML).toBe(
            "<div><div>" +
                '<a href="https://perdu.com" class="linkified" target="_blank" rel="noreferrer noopener">' +
                "https://perdu.com" +
                "</a></div></div>",
        );

        fireEvent.click(container.querySelector("div"));

        expect(container.innerHTML).toBe(
            "<div><div>" +
                '<a href="https://matrix.org" class="linkified" target="_blank" rel="noreferrer noopener">' +
                "https://matrix.org" +
                "</a></div></div>",
        );
    });
});
