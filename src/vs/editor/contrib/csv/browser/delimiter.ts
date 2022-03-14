/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ICodeEditor } from 'vs/editor/browser/editorBrowser';
import { EditorAction, IActionOptions, registerEditorAction, ServicesAccessor } from 'vs/editor/browser/editorExtensions';
import * as nls from 'vs/nls';
import { CharCode } from 'vs/base/common/charCode';

export class ChangeDelimiterAction extends EditorAction {

	constructor(private readonly delimiter: CharCode, opts: IActionOptions) {
		super(opts);
	}

	public run(accessor: ServicesAccessor, editor: ICodeEditor): void {
		let model = editor.getModel();
		if (!model) {
			return;
		}

		if (model && !model.isDisposed()) {
			model.updateOptions({
				csvDelimiter: this.delimiter,
			});
		}
	}
}

export class CommaDelimiter extends ChangeDelimiterAction {

	public static readonly ID = 'editor.action.commaDelimiter';

	constructor() {
		super(CharCode.Comma, {
			id: CommaDelimiter.ID,
			label: nls.localize('commaDelimiter', "Comma Delimiter"),
			alias: 'Comma Delimiter',
			precondition: undefined
		});
	}
}

export class TabDelimiter extends ChangeDelimiterAction {

	public static readonly ID = 'editor.action.tabDelimiter';

	constructor() {
		super(CharCode.Tab, {
			id: TabDelimiter.ID,
			label: nls.localize('tabDelimiter', "Tab Delimiter"),
			alias: 'Tab Delimiter',
			precondition: undefined
		});
	}
}

export class PipeDelimiter extends ChangeDelimiterAction {

	public static readonly ID = 'editor.action.pipeDelimiter';

	constructor() {
		super(CharCode.Pipe, {
			id: PipeDelimiter.ID,
			label: nls.localize('pipeDelimiter', "Pipe Delimiter"),
			alias: 'Pipe Delimiter',
			precondition: undefined
		});
	}
}

export class DetectDelimiter extends EditorAction {

	public static readonly ID = 'editor.action.detectDelimiter';

	constructor() {
		super({
			id: DetectDelimiter.ID,
			label: nls.localize('detectDelimiter', "Detect Delimiter from Content"),
			alias: 'Detect Delimiter from Content',
			precondition: undefined
		});
	}

	public run(accessor: ServicesAccessor, editor: ICodeEditor): void {
		let model = editor.getModel();
		if (!model) {
			return;
		}

		model.detectCsvDelimiter();
	}
}

registerEditorAction(CommaDelimiter);
registerEditorAction(TabDelimiter);
registerEditorAction(PipeDelimiter);
registerEditorAction(DetectDelimiter);
