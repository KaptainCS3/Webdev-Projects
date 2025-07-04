import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import ErrorMSG from "./ErrorMSG";

interface DictionaryResult {
  word: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
    antonyms: string[];
    synonyms: string[];
  }>;
  phonetics: Array<{
    text?: string;
    audio?: string;
  }>;
  sourceUrls: string[];
}

interface SearchProps {
  url: string;
  setResult: React.Dispatch<React.SetStateAction<DictionaryResult[]>>;
}

const Search: React.FC<SearchProps> = ({ url, setResult }) => {
  const [error, setError] = useState<string | null>(null);
  const [fireworks, setFireworks] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema: Yup.object({
      search: Yup.string().min(3, "Search too short").required("Required"),
    }),
    onSubmit: async ({ search }, { setSubmitting }) => {
      try {
        const response = await fetch(url + search);
        const data = await response.json();
        if (response.status === 404) {
          setError(data.title);
        } else {
          setResult(data);
          setFireworks(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
        setTimeout(() => {
          setFireworks(false);
        }, 4000);
      }
    },
  });

  return (
    <div>
      <form
        className="relative rounded-2xl flex justify-between items-center px-4 py-3 bg-[#f4f4f4] md:py-4 lg:py-4"
        onSubmit={formik.handleSubmit}
      >
        <input
          type="text"
          placeholder="search word"
          className="outline-none w-[90%] bg-transparent"
          {...formik.getFieldProps("search")}
        />
        <button className="text-[#A641F5]" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      {formik.touched.search && formik.errors.search ? (
        <ErrorMSG error_value={formik.errors.search} />
      ) : error ? (
        <ErrorMSG error_value={error} />
      ) : null}
      {fireworks && <Fireworks autorun={{ speed: 3, duration: 4 }} />}
    </div>
  );
};

export default Search;
