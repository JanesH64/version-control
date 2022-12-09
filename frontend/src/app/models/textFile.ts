import { FileData } from "./fileData";

export interface TextFile {
    id: string;
    name: string;
    head: FileData;
    versions: Array<FileData>;
}