import React, { Component } from 'react';
import { withWeb3 } from 'web3-webpacked-react';
import { Toolbar, Checkbox, Table, TableHead, TableBody, TableRow, TableCell, TableFooter } from '@material-ui/core';
import { withStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapVertIcon from '@material-ui/icons/SwapVert';

import TransactionButton from './TransactionButton'
import ResolverComponents from './resolvers/index'
import ResolverModal from './resolvers/ResolverModal'
import StoreModal from './StoreModal'

import { getContract, linkify } from '../common/utilities'

const styles = {
  addResolver: {
    textAlign: 'left'
  }
}

class SnowflakeResolvers extends Component {
  constructor(props) {
    super(props)

    const isSelected = {}
    const rows = {}
    this.props.resolvers.forEach(resolver => {
      isSelected[resolver] = false

      rows[resolver] = {
        id:           resolver,
        resolver:     resolver,
        name:         this.props.resolverDetails[resolver].name,
        description:  this.props.resolverDetails[resolver].description,
        allowance:    this.props.resolverDetails[resolver].allowance,
        newAllowance: this.props.resolverDetails[resolver].allowance
      }
    })

    this.state = {
      rows: rows,
      isSelected: isSelected
    }

    this.linkify = linkify.bind(this)
    this.getContract = getContract.bind(this)
  }

  getCustomResolver(resolver) {
    let customResolver = undefined
    const ResolverComponent = ResolverComponents[resolver]
    if (ResolverComponent !== undefined) {
      const resolverContract = this.getContract(resolver, true)
      customResolver = (
        <ResolverModal resolverName={this.state.rows[resolver].name}>
          <ResolverComponent hydroId={this.props.hydroId} resolverContract={resolverContract} />
        </ResolverModal>
      )
    }

    return customResolver
  }

  handleClick = (e, id) => {
    if ((e.target.tagName === 'INPUT' && e.target.type === 'number') || e.target.tagName === 'A') {
      return
    }

    this.setState(oldState => {
      // reset new allowances
      const newRows = oldState.rows
      Object.keys(newRows).forEach(key => {
        newRows[key].newAllowance = newRows[key].allowance
      })
      return {isSelected: {...oldState.isSelected, [id]: !oldState.isSelected[id]}, rows: newRows}

    })
  }

  render() {
    const anySelected = Object.values(this.state.isSelected).some(x => x)
    const anyNotSelected = Object.values(this.state.isSelected).some(x => !x)
    const allSelected = Object.values(this.state.isSelected).every(x => x)

    const selectedResolvers = Object.keys(this.state.isSelected).filter(key => this.state.isSelected[key])

    const allowanceChanged = selectedResolvers.map(resolver => {
      return this.state.rows[resolver].allowance !== this.state.rows[resolver].newAllowance
    }).some(x => x)

    return (
      <div style={{width: '100%'}}>
        <Toolbar style={{visibility: anySelected ? 'visible' : 'hidden'}}>
          <TransactionButton
            buttonInitial={allowanceChanged ?
              <React.Fragment>Update<SwapVertIcon/></React.Fragment>
              :
              <React.Fragment>Remove<DeleteIcon/></React.Fragment>
            }
            method={allowanceChanged ?
              this.getContract('snowflake').methods.changeResolverAllowances(
                selectedResolvers,
                selectedResolvers.map(resolver => {
                  const amount = this.state.rows[resolver].newAllowance
                  return this.props.w3w.fromDecimal(String(amount), 18)
                })
              )
              :
              this.getContract('snowflake').methods.removeResolvers(selectedResolvers, false)
            }
            onConfirmation={() => { this.props.getAccountDetails(true) }}
          />
        </Toolbar>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {this.props.resolvers.length > 0 ? (
                  <Checkbox
                    indeterminate={anySelected && anyNotSelected}
                    checked={allSelected}
                    onChange={() => {
                      this.setState(oldState => {
                        const newIsSelected = {}
                        let targetValue = true
                        if (allSelected) targetValue = false
                        Object.keys(oldState.isSelected).forEach(x => { newIsSelected[x] = targetValue})
                        return {isSelected: newIsSelected}
                      })
                    }}
                  />
                ) :
                  ''
                }
              </TableCell>
              <TableCell>Resolver</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Allowance</TableCell>
              <TableCell padding="checkbox"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(this.state.rows).map(row => {
              return (
                <TableRow
                  hover
                  onClick={e => this.handleClick(e, row.id)}
                  role="checkbox"
                  aria-checked={this.state.isSelected[row.id]}
                  key={row.id}
                  selected={this.state.isSelected[row.id]}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={this.state.isSelected[row.id]} />
                  </TableCell>
                  <TableCell>{this.linkify('address', row.resolver, undefined, 'body1')}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell >
                    {this.state.isSelected[row.id] ?
                      <TextField
                        id={row.id}
                        value={row.newAllowance}
                        onChange={e => {
                          const value = e.target.value
                          this.setState(oldState => {
                            const newRows = oldState.rows
                            newRows[row.id].newAllowance = value
                            return {rows: newRows}
                          })
                        }}
                        type="number"
                        margin="normal"
                      />
                      :
                      row.allowance
                    }
                  </TableCell>
                  <TableCell padding="checkbox">{this.getCustomResolver(row.resolver)}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell key={this.props.resolvers} className={this.props.classes.addResolver}>
                <StoreModal
                  hydroId={this.props.hydroId}
                  addedResolvers={this.props.resolvers}
                  getAccountDetails={this.props.getAccountDetails}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}

export default withWeb3(withStyles(styles)(SnowflakeResolvers))
