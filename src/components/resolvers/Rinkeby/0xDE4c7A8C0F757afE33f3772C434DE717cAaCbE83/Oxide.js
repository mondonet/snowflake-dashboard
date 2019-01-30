import React, { useState } from 'react'
import { Grid, TextField, Typography, Button } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import SvgIcon from '@material-ui/core/SvgIcon'
import Avatar from '@material-ui/core/Avatar'
import OxideIcon from '@material-ui/icons/InvertColors';
import TimerIcon from '@material-ui/icons/HourglassEmpty';
import UsersIcon from '@material-ui/icons/People';
import { withStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/StarBorder';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useAccountEffect, useWeb3Context } from 'web3-react/hooks'

import { useHydroId, useEINDetails, useSnowflakeBalance, useGenericContract, useNamedContract } from '../../../../common/hooks'
import TransactionButton from '../../../common/TransactionButton'

import { ABI } from './index'

import './Oxide.css'

const blankLeaderboard = { ein: [], id: [], wager: [] , roll: [], oxide: [] }

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#0971f5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function Oxide ({ ein }) {
  const context = useWeb3Context()
  const einDetails = useEINDetails(ein)
  const [activePot, setPot]  = useState(0)
  const [rollResult, setRoll]  = useState(0)
  const [activeRound, setRound]  = useState(0)
  const [oxideBalance, setOxide]  = useState(0)
  const [committedWager, setWager]  = useState(0)
  const [activePunters, setPunters]  = useState(0)
  const [hydroId, hydroIdAddress] = useHydroId()
  const [waitForRender, setInit]  = useState(false)
  const [leaderboardData, setLeaderboard]  = useState(blankLeaderboard)
  const clientRaindropContract = useNamedContract('clientRaindrop')
  const oxideContract = useGenericContract('0xDE4c7A8C0F757afE33f3772C434DE717cAaCbE83', ABI)
  const snowflakeBalance = useSnowflakeBalance(ein)

  function refreshLeaderboard()  {
    setLeaderboard(blankLeaderboard)
    oxideContract.getPastEvents("scoreLog", { fromBlock: 0, toBlock: 'latest' })
    .then((result) => {
        var leaderboard = blankLeaderboard
        for(var x = 0; x < result.length; x++){
          var round = parseInt(parseObject(result[x].returnValues.wagerRound))
          if(round == activeRound){
            leaderboard.ein.push(parseObject(result[x].returnValues.wagerUser))
            leaderboard.wager.push(parseNumber(parseObject(result[x].returnValues.wagerAmount)))
            leaderboard.roll.push(parseNumber(parseObject(result[x].returnValues.wagerRoll)))
          }
        }
        setLeaderboard(leaderboard)
      })
      setInit(true)
  }

  function parseObject(_object) {
      return JSON.stringify(_object).replace(/["]+/g, '')
  }

  function parseNumber(_value) {
      return _value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  useAccountEffect(() => {
      oxideContract.methods.oxideBalance(context.account).call()
      .then((oxide) => setOxide(parseNumber(oxide)))
      oxideContract.methods.getParticipants().call()
      .then((punters) => setPunters(punters))
      oxideContract.methods.getRound().call()
      .then(round => setRound(round))
      oxideContract.methods.getPot().call()
      .then(pot => activePot(pot))
      refreshLeaderboard()
  })

    return (

  <div>

         <Grid container direction="row" justify="center" alignItems="center" className="OxideStats">
           <Grid item >
           </Grid>
           <Grid item >
           <Chip
             avatar={<Avatar><UsersIcon/></Avatar>}
             color='primary'
             label={activePunters}
           />
           </Grid>
           <Grid item >
           <Chip
             avatar={<Avatar><StarIcon/></Avatar>}
             color='primary'
             label={activePot}
           />
           </Grid>
           <Grid item >
           <Chip
             avatar={<Avatar><TimerIcon/></Avatar>}
             color='primary'
             label={activeRound}
           />
           </Grid>
           <Grid item >
           </Grid>
        </Grid>


        <Grid container direction="row" justify="center" alignItems="center"  className="OxideLeaderboard">
        <Grid item >
          <Table>
                 <TableHead>
                   <TableRow>
                     <CustomTableCell>Score</CustomTableCell>
                     <CustomTableCell align="right">EIN</CustomTableCell>
                     <CustomTableCell align="right">HydroId</CustomTableCell>
                     <CustomTableCell align="right">Wager</CustomTableCell>
                     <CustomTableCell align="right">Roll</CustomTableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                     <TableRow>
                       <CustomTableCell component="th" scope="row">
                         {leaderboardData.ein[0]}
                       </CustomTableCell>
                       <CustomTableCell align="right">{leaderboardData.id[0]}</CustomTableCell>
                       <CustomTableCell align="right">{leaderboardData.wager[0]}</CustomTableCell>
                       <CustomTableCell align="right">{leaderboardData.roll[0]}</CustomTableCell>
                       <CustomTableCell align="right">{leaderboardData.oxide[0]}</CustomTableCell>
                     </TableRow>
                 </TableBody>
               </Table>
               </Grid>
               </Grid>

         <Grid container direction="row" justify="center" alignItems="center"  className="OxideWager">
         <Grid item >
         </Grid>
         <Grid item >
         <Chip
           avatar={
             <Avatar>
             <SvgIcon viewBox="0 0 512 512">
               <path d="M256,512C114.62,512,0,397.38,0,256S114.62,0,256,0,512,114.62,512,256,397.38,512,256,512Zm0-89c70.69,0,128-60.08,128-134.19q0-62.17-90.1-168.44Q282.38,106.74,256,77.91q-27.8,30.42-39.84,44.71Q128,227.27,128,288.77C128,362.88,185.31,423,256,423Z" />
             </SvgIcon>
             </Avatar>
           }
           label={snowflakeBalance}
         />
         </Grid>
         <Grid item>
         <Chip
           avatar={
             <Avatar>
             <OxideIcon/>
             </Avatar>
           }
           color='primary'
           label={oxideBalance}
         />
         </Grid>
         <Grid item >
         </Grid>
         </Grid>

         <Grid container direction="row" justify="center" alignItems="center">
           <Grid item >
           </Grid>
           <Grid item >
           <TextField
             label="Wager Amount"
             helperText="Disclaimer: You are placing a bet and could possibly lose your funds."
             margin="normal"
             value={committedWager}
             onChange={e => setWager(e.target.value)}
             halfWidth
           />
           </Grid>
           <Grid item >
           </Grid>
         </Grid>

         <Grid container direction="row" justify="center" alignItems="center"  className="OxideButton">
           <Grid item >
           </Grid>
           <Grid item >
           </Grid>
           <Grid item >
         <TransactionButton
           readyText='Wager'
           method={() => oxideContract.methods.placeWager(committedWager)}
           onConfirmation={context.forceAccountReRender}
          />
          </Grid>
          <Grid item >
          </Grid>
        </Grid>
   </div>
  )
}
