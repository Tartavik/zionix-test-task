'use client'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import { GameResult } from "../../constant/DiceType";

interface TableResultProps {
  gameHistory: GameResult[]
}

export default function TableResult({gameHistory}: TableResultProps) {  
  return (
      <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Game History
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Guess</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gameHistory.map((game, index) => (
              <TableRow key={index}>
                <TableCell>{game.time}</TableCell>
                <TableCell>{game.guess}</TableCell>
                <TableCell sx={{ color: game.isWin ? "success.main" : "error.main"}}>{game.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}