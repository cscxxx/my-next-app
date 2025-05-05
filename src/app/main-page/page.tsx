"use client";
import React from "react";
import {
  formatDate,
  debounce,
  fetchData,
  enumToArray,
  Button,
  Header,
} from "@shuchaoxxx/csc-utils";

export default function Page() {
  enum Status {
    PENDING,
    SUCCESS,
    ERROR,
  }

  return (
    <div className=" p-[12px] rounded-md">
      {JSON.stringify(enumToArray(Status))}
      {formatDate(new Date())}
      Auth Page
      <Button primary label={"123"} />
      <Header></Header>
    </div>
  );
}
