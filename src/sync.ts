// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@konceiver/kv-file";
import { deserialize, serialize } from "bson";
import { ensureFileSync, readFileSync, writeFileSync } from "fs-extra";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	protected dump(): void {
		writeFileSync(this.uri, serialize(this.all()));
	}

	protected load(): void {
		ensureFileSync(this.uri);

		const content = readFileSync(this.uri);

		if (content === undefined || content.length === 0) {
			return;
		}

		for (const [key, value] of Object.entries(deserialize(content))) {
			// @ts-ignore
			this.put(key, value);
		}
	}
}
