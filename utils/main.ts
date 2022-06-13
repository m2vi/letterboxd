import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import Papa from 'papaparse';

export type Result = Array<{
  date_added: string;
  title: string;
  year: number;
  url: string;
}>;

class Main {
  public handleChange(e: ChangeEvent<HTMLInputElement>, dispatch: Dispatch<SetStateAction<Result>>) {
    const file = e.currentTarget?.files?.[0];
    if (!file) return null;

    const reader = this.getContent(file);

    reader.onload = () => {
      const data = this.format(this.filterRaw(this.parse(reader.result?.toString()!)));

      dispatch(data);
    };
  }

  private getContent(file: File) {
    const reader = new FileReader();

    reader.readAsText(file);

    return reader;
  }

  private parse(text: string) {
    return Papa.parse<Array<string>>(text).data;
  }

  private filterRaw(arr: string[][]) {
    let result: string[][] = arr;

    return result.filter(([s], index) => {
      if ([0, arr.length - 1].includes(index)) return false;

      return Boolean(s);
    });
  }

  private format(arr: string[][]): Result {
    return arr.map(([date_added, title, year, url]) => {
      return {
        date_added,
        title,
        year: parseInt(year),
        url,
      };
    });
  }
}

export const main = new Main();
export default main;
