export class FileItem {
  Key: string;
  ETag: string;
  LastModified: string;
  StorageClass: string;
  Size: string;
}
export class ImgItem {
  Key: string;
  ETag: string;
  title?: string;
  desc?: string;
  block?: string;
}

export class VideoItem {
  Key: string;
  ETag: string;
  title: string;
  shotInfo?: string;
}
