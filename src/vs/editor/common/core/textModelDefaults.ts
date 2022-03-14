/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { CharCode } from 'vs/base/common/charCode';

export const EDITOR_MODEL_DEFAULTS = {
	tabSize: 4,
	csvDelimiter: CharCode.Tab,
	indentSize: 4,
	insertSpaces: true,
	detectIndentation: true,
	detectDelimiter: true,
	trimAutoWhitespace: true,
	largeFileOptimizations: true,
	bracketPairColorizationOptions: { enabled: false }
};
