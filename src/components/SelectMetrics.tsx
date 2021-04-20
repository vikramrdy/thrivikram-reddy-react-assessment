/* eslint-disable react/jsx-filename-extension */
import React, { FC, ReactElement } from 'react';
import get from 'lodash/get';
import { useQuery } from 'urql';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
      marginBottom: 20,
      marginRight: 60,
      marginLeft: 40,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
  }),
);

const query = `
query getMetrics {
  getMetrics
}
`;

type ChildProps = {
  onChange: any;
};

const SelectMetrics: FC<ChildProps> = ({ onChange }): ReactElement => {
  const classes = useStyles();
  const [result] = useQuery({
    query,
    variables: {},
  });

  const options = get(result, 'data.getMetrics', []).map((r: String) => ({ title: r }));

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={options}
        getOptionLabel={(option: { title: string }) => option.title}
        getOptionSelected={(option: { title: string }, value: { title: string }) => option.title === value.title}
        filterSelectedOptions
        onChange={(e, val) => onChange(val)}
        renderInput={(params) => <TextField {...params} variant="outlined" label="Select" placeholder="Parameters" />}
      />
    </div>
  );
};

SelectMetrics.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default SelectMetrics;
