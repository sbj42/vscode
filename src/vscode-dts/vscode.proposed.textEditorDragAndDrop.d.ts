/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

declare module 'vscode' {

	// https://github.com/microsoft/vscode/issues/142990

	export class TextEditorDataTransferItem {
		asString(): Thenable<string>;
		readonly value: any;
		constructor(value: any);
	}

	export class TextEditorDataTransfer<T extends TextEditorDataTransferItem = TextEditorDataTransferItem> {
		get(mimeType: string): T | undefined;
		set(mimeType: string, value: T): void;
		forEach(callbackfn: (value: T, key: string) => void): void;
	}

	export interface TextEditorDragAndDropController {
		handleDrop(editor: TextEditor, position: Position, dataTransfer: TextEditorDataTransfer, token: CancellationToken): Thenable<void> | void;
	}

	export namespace window {
		export function registerTextEditorDragAndDropController(selector: DocumentSelector, controller: TextEditorDragAndDropController): Disposable;
	}
}
