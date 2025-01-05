'use client'
import { useState } from "react";
import {
  Button,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Slider,
} from "@mui/material";
import { alertTypeValue, GameResult } from "../../constant/DiceType";
import PopUpAlert from "../PopUpAlert/PopUpAlert";
import TableResult from "../TableResult/TableResult";

interface IMark {
  value: number;
  label: number;
}

enum conditionValue {
  over = "over",
  under = "under"
}

const MARKS: IMark[] = [
  {
    value: 0,
    label: 0
  },
  {
    value: 100,
    label: 100
  }
];

export default function Dice() {
  const [threshold, setThreshold] = useState<number>(0);
  const [condition, setCondition] = useState<string>(conditionValue.over);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<alertTypeValue.success | alertTypeValue.error | alertTypeValue.info>(alertTypeValue.info);
  const [randomNumber, setRandomNumber] = useState<number | null>(null)

  const playGame = () => {
    const randomResult = Math.floor(Math.random() * 100) + 1;

    const isWin =
      (condition === conditionValue.over && randomResult > threshold) ||
      (condition === conditionValue.under && randomResult < threshold);

    setAlertMessage(
      isWin ? "You won!" : `Number was ${randomResult > threshold ? "higher" : "lower"}`
    );
    setAlertType(isWin ? alertTypeValue.success : alertTypeValue.error);
    setRandomNumber(randomResult)

    const newGamer: GameResult = {
      time: new Date().toLocaleTimeString(),
      guess: `${condition === conditionValue.over ? "Over" : "Under"} ${threshold}`,
      result: randomResult,
      isWin: isWin ? true : false,
    };

    setGameHistory((prev) => {
      const updatedHistory = [newGamer, ...prev];
      return updatedHistory.slice(0, 10);
    });
  };

  const handleChangeValue = (event: Event) => {
    const target = event.target as HTMLInputElement;
    setThreshold(Math.min(100, Math.max(1, Number(target.value))))
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
      <PopUpAlert alertMessage={alertMessage} alertType={alertType} />
      <Box sx={{
        width: 320,
        height: 200,
        m: "120px auto 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(0, 0, 0, 0.04)"
      }}>
        <Typography variant="h1" gutterBottom  sx={{margin: 0}}>
          {randomNumber && randomNumber}
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Slider
          size="small"
          color="secondary"
          orientation="horizontal"
          value={threshold}
          step={1}
          min={0}
          max={100}
          onChange={handleChangeValue}
          valueLabelDisplay="auto"
          marks={MARKS}
        />
      </Box>

      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Condition</FormLabel>
        <RadioGroup
          row
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <FormControlLabel value="over" control={<Radio color="secondary"/>} label="Over" />
          <FormControlLabel value="under" control={<Radio color="secondary"/>} label="Under" />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="secondary"
        sx={{width: 320, margin: "auto"}}
        onClick={playGame}
        >
        Play
      </Button>
      <TableResult gameHistory={gameHistory} />
    </Container>
  );
}
