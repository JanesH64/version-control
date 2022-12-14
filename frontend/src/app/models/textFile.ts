import { FileData } from "./fileData";

export interface TextFile {
    id: string;
    name: string;
    head: FileData;
    locked: boolean;
    versions: Map<string, FileData>;
}