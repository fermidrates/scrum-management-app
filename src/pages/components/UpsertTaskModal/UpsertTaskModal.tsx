import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";

import { INSERT_TASK } from "@/graphQL/mutations";

import { TaskInitialValueType } from "@/types/taskTypes";
import { SelectType } from "@/types/contextTypes";

import { TASK_INITIAL_VALUE, TASK_PROGRESS } from "@/constants/constants";

export type AddTaskModalProps = {
  open: boolean;
  onClose: () => void;
};

const UpsertTaskModal = ({ open, onClose }: AddTaskModalProps) => {
  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useFormik({
      initialValues: TASK_INITIAL_VALUE,
      onSubmit: (formValues: TaskInitialValueType) => {
        insertTask({
          variables: {
            title: formValues.title,
            description: formValues.description,
            assignee: formValues.assignee,
            progress: formValues.progress,
          },
        });
      },
    });

  const [insertTask] = useMutation(INSERT_TASK, {
    onCompleted: () => {
      // TODO: tell user upsert task process is successful
      // TODO: refetch to see immediate change, or update cache directly
      onClose();
    },
    onError: () => {
      // TODO: based on error, tell user which part of the form that is not completed
      console.error("upsert failed");
    },
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    setFieldValue("progress", e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 2, display: "grid", gap: "8px", minWidth: "400px" }}
      >
        <TextField
          id="input-title"
          label="Task Title"
          name="title"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id="input-description"
          label="Description"
          name="description"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id="input-assignee"
          label="Assignee"
          name="assignee"
          onChange={handleChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="select-progress">Progress</InputLabel>
          <Select
            value={values?.progress}
            labelId="select-progress"
            id="select-progress"
            label="Progress"
            name="progress"
            onChange={handleSelectChange}
          >
            {TASK_PROGRESS.map((progress: SelectType) => {
              return (
                <MenuItem value={progress.value}>{progress.label}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <DialogActions>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpsertTaskModal;
