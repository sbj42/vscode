/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ITextEditorDataTransfer, ITextEditorDataTransferItem } from 'vs/workbench/contrib/dnd/common/dataTransfer';

interface TextEditorDataTransferItemDTO {
	asString: string;
}

export interface TextEditorDataTransferDTO {
	types: string[];
	items: TextEditorDataTransferItemDTO[];
}

export namespace TextEditorDataTransferConverter {
	export function toITextEditorDataTransfer(value: TextEditorDataTransferDTO): ITextEditorDataTransfer {
		const newDataTransfer: ITextEditorDataTransfer = new Map<string, ITextEditorDataTransferItem>();
		value.types.forEach((type, index) => {
			newDataTransfer.set(type, {
				asString: async () => value.items[index].asString,
				value: undefined
			});
		});
		return newDataTransfer;
	}

	export async function toTextEditorDataTransferDTO(value: ITextEditorDataTransfer): Promise<TextEditorDataTransferDTO> {
		const newDTO: TextEditorDataTransferDTO = {
			types: [],
			items: []
		};
		const entries = Array.from(value.entries());
		for (const entry of entries) {
			newDTO.types.push(entry[0]);
			newDTO.items.push({
				asString: await entry[1].asString()
			});
		}
		return newDTO;
	}
}
