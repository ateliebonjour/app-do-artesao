import InsumosController from './InsumosController.js';
import InsumosView from './InsumosView.js';
import InsumosDatabase from '../../infrastructure/InsumosDatabase.js';
import InsumosLogic from '../../logic/InsumosLogic.js';

const db = InsumosDatabase.create();
const logic = new InsumosLogic();
const view = new InsumosView();

const controller = new InsumosController(view, db, logic);
controller.start();
