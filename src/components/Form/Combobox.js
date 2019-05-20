import React from 'react';
import styled from 'styled-components';
import helpers from '../../services/helpers';

const { antibind } = helpers;

// Tomado de https://github.com/PabloFer13/proyectos-front/blob/master/src/containers/Crear/Crear.styled.js

export const ComboboxWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 100;
`;

export const ComboboxInput = styled.input`
  display: block;
`;

export const ComboboxMenu = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
  height: 200px;
  overflow-y: auto;
  background-color: #ffffff;
`;

export const OptionsWrapper = styled.ul`
  margin-top: 10px;
`;

export const OptionItem = styled.li`
  text-transform: capitalize;
  :hover {
    background-color: #18428a;
    color: #ffffff;
  }
`;

export const Combobox = ({
  showMenu,
  options,
  selectCb,
  inputCb,
  val,
  placeholder,
}) => (
    <ComboboxWrapper>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={val}
        onChange={inputCb}
      />
      {showMenu ? (
        <ComboboxMenu>
          <OptionsWrapper>
            {options.map((item, index) => (
              <OptionItem
                key={`hotel-${item.id}`}
                onClick={antibind(
                  selectCb,
                  index
                )}
              >
                {item.nombreEtiqueta}
              </OptionItem>
            ))}
            <OptionItem onClick={antibind(selectCb, -1)}>Crear Etiqueta</OptionItem>
          </OptionsWrapper>
        </ComboboxMenu>
      ) : null}
    </ComboboxWrapper>
  );

export default Combobox;