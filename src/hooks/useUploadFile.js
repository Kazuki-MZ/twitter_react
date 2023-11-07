import { useCallback, useEffect } from "react";

export const useUploadFile = ({ file, setFile }) => {
  useEffect(() => {
    if (file.image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(preveHeader => ({
          ...preveHeader,
          preview: reader.result,
        }));
      };
      reader.readAsDataURL(file.image);
    } else {
      setFile(preveHeader => ({
        ...preveHeader,
        preview: null,
      }));
    }
  }, [file.image]);

  const checkFileExists = useCallback(
    e => {
      const selectFile = e.target.files[0];
      if (selectFile) {
        setFile(preveFile => ({
          ...preveFile,
          image: selectFile,
        }));
      } else {
        setFile(preveFile => ({
          ...preveFile,
          image: "",
        }));
      }
    },
    [setFile]
  );

  const onClickNullFile = useCallback(
    e => {
      setFile(preveFile => ({
        ...preveFile,
        image: null,
      }));
    },
    [setFile]
  );

  return { checkFileExists, onClickNullFile, file };
};
