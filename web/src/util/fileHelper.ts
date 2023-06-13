export const mergeFileLists = (list1: FileList, list2: FileList) => {
  let mergedList = new DataTransfer();
  for (let i = 0; i < list1.length; i++) {
    mergedList.items.add(list1[i]);
  }
  for (let i = 0; i < list2.length; i++) {
    mergedList.items.add(list2[i]);
  }
  return mergedList.files;
};

export const fileListToUrlList = async (fileList: FileList) => {
  let urlList: string[] = [];

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];

    const promise = new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageUrl = URL.createObjectURL(file);
        resolve(imageUrl);
      };
      reader.readAsDataURL(file);
    });

    urlList.push(await promise);
  }

  return urlList;
};

export const removeFileFromList = (
  fileList: FileList,
  index: number
): FileList => {
  const files = Array.from(fileList);
  files.splice(index, 1);
  const newFileList =
    new ClipboardEvent("").clipboardData || new DataTransfer();
  files.forEach((file) => newFileList.items.add(file));
  return newFileList.files;
};
