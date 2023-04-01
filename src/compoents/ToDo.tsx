import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../state";
import styled from "styled-components";

const Category = styled.div`
  background-color: #666146;
  display: inline-block;
  width: 50px;
  margin: 5px;
`;
const Category1 = styled.div`
  display: inline-block;
  width: 60px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name: id },
    } = event;
    setToDos((toDos) => {
      return toDos.filter((todo) => todo.id !== Number(id));
    });
  };

  return (
    <li>
      <Category>{category}</Category>
      <Category1>{text}</Category1>
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          Done
        </button>
      )}
      {
        <button name={String(id)} onClick={onDelete}>
          {" "}
          X
        </button>
      }
    </li>
  );
}

export default ToDo;
