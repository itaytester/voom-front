import { DatePicker } from "@mui/lab";
import { Card, FormHelperText, InputLabel, FormControl, TextField, TextFieldProps, Input} from "@mui/material";
import { useState } from "react";
import ArticleQuery from "../types/articleQuery";
import { DebouncedFunc } from "lodash";

interface IArticleSearchProps {
  debounceArticles: DebouncedFunc<(query: ArticleQuery) => Promise<void>>;
}

interface FieldValidationObject {
  isError: boolean;
  message?: string | null;
}

const ArticleSearhBar: React.FC<IArticleSearchProps> = ({
  debounceArticles,
}) => {
  const [words, setWords] = useState<string>("");
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [fromError, setFromError] = useState<FieldValidationObject>({
    isError: false,
  });
  const [toError, setToError] = useState<FieldValidationObject>({
    isError: false,
  });

  const handleFromChange = (newValue: Date | null) => {
    setFrom(newValue);
    const validDate = newValue?.toString() !== "Invalid Date";
    const isContradicting = validDate && to && newValue && newValue > to;
    if (!validDate)
      setFromError({ isError: true, message: "Date format isn't valid" });
    if (isContradicting)
      setFromError({
        isError: true,
        message: `"From" date conflicts with "To" Date`,
      });
    if (validDate && !isContradicting) {
      debounceArticles({ words, to, from: newValue });
      setFromError({ isError: false });
    }
  };

  const handleToChange = (newValue: Date | null) => {
    setTo(newValue);
    const validDate = newValue?.toString() !== "Invalid Date";
    const isContradicting = validDate && from && newValue && newValue < from;
    if (!validDate)
      setToError({ isError: true, message: "Date format isn't valid" });
    if (isContradicting)
      setToError({
        isError: true,
        message: `"From" date conflicts with "To" Date`,
      });
    if (validDate && !isContradicting) {
      debounceArticles({ words, to: newValue, from });
      setToError({ isError: false });
    }
  };

  const handleWordsChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const newValue = e.target.value;
    setWords(e.target.value);
    debounceArticles({ words: newValue, to, from });
  };

  return (
    <Card className="news-search-bar" variant="outlined">
      <TextField
      name="words"
        label="Keywords"
        InputLabelProps= {{htmlFor: "words"}}
        placeholder="Enter Keywords"
        id="words"
        variant="outlined"
        value={words}
        onChange={handleWordsChange}
      />
      <DatePicker
        label="From"
        inputFormat="dd/MM/yyyy"
        value={from}
        onChange={handleFromChange}
        renderInput={(params: TextFieldProps) => (
          <TextField
          InputLabelProps= {{htmlFor: "from"}}
            id="from"
            {...params}
            error={fromError.isError}
            helperText={fromError?.message}
          />
        )}
      />

      <DatePicker
        label="To"
        inputFormat="dd/MM/yyyy"
        value={to}
        onChange={handleToChange}
        renderInput={(params: TextFieldProps) => (
          <TextField
          InputLabelProps= {{htmlFor: "to"}}
            id="to"
            {...params}
            error={toError.isError}
            helperText={toError?.message}
          />
        )}
      />
    </Card>
  );
};

export default ArticleSearhBar;
