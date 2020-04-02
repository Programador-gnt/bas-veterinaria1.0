import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	Button,
	Grid
} from '@material-ui/core';
// import { AuthTokenRequest } from '../helpers/AxiosInstance';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
// import ValorContext from './valorContext';
import AppInteractionContext from '../helpers/appInteraction';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
	back: {
		transform: 'translateZ(0px)',
		position: 'fixed',
		zIndex: 100
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
		width: 130,
		height: 130,
		margin: 'auto'
	},
	texto: {
		textAlign: 'center',
		marginTop: theme.spacing(1)
	},
	card: {
		width: '95%',
		transition: 'all .2s ease-in-out',
		'&:hover': {
			transform: 'scale(1.02)'
		}
	},
	typography: {
		padding: theme.spacing(2),
	},
	button: {
		marginTop: theme.spacing(3.5)
	},
	formControl: {
		marginTop: theme.spacing(2),
		width: '100%'
	}
}));

function formatDateFinal(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('/');
}

function formatDateInicio(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;

	return ['01', month, year].join('/');
}

export default function TablaKardex() {
	const { interactions, dispatch } = React.useContext(AppInteractionContext)
	// const { valor, dispatchValor } = React.useContext(ValorContext)
	const [filtro, setFiltro] = React.useState({
		fecha2: new Date(),
		fecha1: formatDateInicio(new Date()),
		almacen: 'NINGUNO',
		producto: 'NINGUNO',
		orden: 'producto'
	})
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(filtro.fecha2);
	const classes = useStyles();

	const onChange = (e) => {
		setFiltro({
			...filtro,
			[e.target.name]: e.target.value
		})
	}

	const handleFechaFiltro = date => {
		setSelectedDateFiltro(date);
		setFiltro({
			...filtro,
			fecha2: formatDateFinal(date)
		})
	}

	const consultarAcciones = () => {
		// AuthTokenRequest.post('acciones', { form: 'listaContactos' })
		// 	.then(result => {
		var aja = [
			{ name: 'Imprimir' },
			{ name: 'Excel' }
		]
		dispatch(['listaKardex', '/kardex', 'funcion', interactions.formContent.funcionSecundaria, aja])
		// })
	}

	React.useEffect(consultarAcciones, [])

	return (
		<>
			<Grid container spacing={2}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid item xs={12} sm={4}>
						<KeyboardDatePicker
							disableToolbar
							fullWidth
							margin='normal'
							variant="inline"
							format="dd/MM/yyyy"
							id="date-picker-inline2"
							label="Fecha"
							value={filtro.fecha1}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Grid item xs={12} sm={4}>
						<KeyboardDatePicker
							disableToolbar
							fullWidth
							margin='normal'
							variant="inline"
							format="dd/MM/yyyy"
							id="date-picker-inline3"
							label="Al"
							value={selectedDateFiltro}
							onChange={handleFechaFiltro}
							KeyboardButtonProps={{
								"aria-label": "change date"
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
				<Grid item xs={12} sm={4} />
				<Grid item xs={12} sm={4}>
					<FormControl className={classes.formControl}>
						<InputLabel>Almacen</InputLabel>
						<Select value={filtro.almacen || ''} onChange={onChange} name='almacen' fullWidth>
							<MenuItem value='NINGUNO'>NINGUNO</MenuItem>
							<MenuItem value='callao'>CALLAO</MenuItem>
							<MenuItem value='ica'>ICA</MenuItem>
							<MenuItem value='paita'>PAITA</MenuItem>
							<MenuItem value='miraflores'>MIRAFLORES</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4}>
					<FormControl className={classes.formControl}>
						<InputLabel>Producto</InputLabel>
						<Select value={filtro.producto || ''} onChange={onChange} name='producto' fullWidth>
							<MenuItem value='NINGUNO'>NINGUNO</MenuItem>
							<MenuItem value='producto1'>Producto1</MenuItem>
							<MenuItem value='producto2'>Producto2</MenuItem>
							<MenuItem value='producto3'>Producto3</MenuItem>
							<MenuItem value='producto4'>Producto4</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4} />
				<Grid item xs={12} sm={4}>
					<FormControl className={classes.formControl}>
						<InputLabel>Orden</InputLabel>
						<Select value={filtro.orden || ''} onChange={onChange} name='orden' fullWidth>
							<MenuItem value='producto'>Producto</MenuItem>
							<MenuItem value='almacen'>Almacen</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Button variant='contained' color='primary' className={classes.button} onClick={() => alert('generando Kardex')}>Buscar</Button>
				</Grid>
				<Grid item xs={12} sm={4} />
			</Grid>
		</>
	);
}