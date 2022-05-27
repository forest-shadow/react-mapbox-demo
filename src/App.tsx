import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import {useDispatch} from "react-redux";
import {AppHeader, ChartPanel, MapView} from './layout';
import {getBoatRampsDataThunk} from "store/thunks";
import {TThunkDispatch} from "types/Store.types";
import {IBoatRampsData, IBoatRampsFilterConfig} from "types/BoatRamps.types";
import {useWindowSize} from "hooks";
import {APP_HEADER_HEIGHT} from "layout/AppHeader";

function App() {
  const dispatch = useDispatch<TThunkDispatch>();
  const [boatRampsFilter, setBoatRampsFilter] = useState<IBoatRampsFilterConfig | null>(null);
  const windowSize = useWindowSize();
  const contentSectionHeight = windowSize.height - APP_HEADER_HEIGHT;

  useEffect(() => {
    dispatch(getBoatRampsDataThunk());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppHeader />

      <Box
        display="flex"
        height={contentSectionHeight}
        overflow="hidden"
      >
        <MapView
          boatRampsFilter={boatRampsFilter}
          mapHeight={contentSectionHeight}
        />
        <ChartPanel />
      </Box>
    </Box>
  );
}

export default App;
