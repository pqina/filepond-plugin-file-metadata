declare module "filepond-plugin-file-metadata" {
    const FilepondPluginFileMetadata: FilepondPluginFilepondPluginFileMetadataProps;
    export interface FilepondPluginFilepondPluginFileMetadataProps {
        /** Enable or disable the filemetadata object */
        allowFileMetadata: boolean;

        /** The object that is used to set the initial metadata object of each file item */
        fileMetadataObject: undefined | object | null;
    }
    export default FilepondPluginFileMetadata;
}
