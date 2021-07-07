const methods = {
	data() {
		return {
			obj: {
				nameTask: "",
				dateStart: "",
				dateEnd: "",
				trust: "",
				status: "",
				statusCheck: "",
				naming: "",
				id: 1,
				modded_id: 1
			},

			tasks: [],
			count: {
				cPlan: 0,
				cWork: 0,
				cDone: 0
			},

			isActive: false,
			mod: true,
			check: false,
			disableTrust: false,
			disableDateStart: false,
			disableDateEnd: false
		}
	},
	methods: {
		startDrag: (evt, item) => {
			evt.dataTransfer.dropEffect = 'move';
			evt.dataTransfer.effectAllowed = 'move';
			evt.dataTransfer.setData('itemID', item.local_name);
		},

		onDrop(evt, list) {
			const itemID = evt.dataTransfer.getData('itemID');
			const item = this.tasks.find(item => item.local_name == itemID);
			item.status = list;
			this.c();
			
			for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i]['dateStart'] === "" && this.tasks[i]['status'] === "work") {
					this.tasks[i]['dateStart'] = new Date().toLocaleString()
					dateStart = this.tasks[i]['dateStart'].split(/\.|,|:/);
				}

				if (this.tasks[i]['dateEnd'] === "" && this.tasks[i]['status'] === "done") {
					if (this.tasks[i]['dateStart'] === "") {
						this.tasks[i]['dateStart'] = new Date().toLocaleString()
						dateStart = this.tasks[i]['dateStart'].split(/\.|,|:/);

					}
					this.tasks[i]['dateEnd'] = new Date().toLocaleString()
					dateEnd = this.tasks[i]['dateEnd'].split(/\.|,|:/);

					diffStart = new Date(dateStart[2], dateStart[1] - 1, dateStart[0], dateStart[3], dateStart[4], dateStart[5]).getTime();
					diffTEnd = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0], dateEnd[3], dateEnd[4], dateEnd[5]).getTime();
					lot = diffTEnd - diffStart;

					d = lot / (1000 * 60 * 60 * 24);
					h = (lot / (1000 * 60 * 60)) % 24;
					m = (lot / (1000 * 60)) % 60;
					s = (lot / 1000) % 60;

					this.tasks[i]['dateAll'] = "Дней: " + this.zeroPrefix(d) + Math.trunc(d) +
						" Часов: " + this.zeroPrefix(h) + Math.trunc(h) +
						" Минут: " + this.zeroPrefix(m) + Math.trunc(m) +
						" Секунд: " + this.zeroPrefix(s) + Math.trunc(s)
				}
			}
		},
		zeroPrefix(num) {
			var zero = '';
			if (num < 10)
				zero = '0';
			return zero
		},
		tc() {
			this.isActive = !this.isActive;
		},
		close() {
			this.obj.nameTask = "";
			this.obj.dateStart = "";
			this.obj.status = "";
			this.mod = false;
			this.check = false;

		},
		first() {
			if (!this.check) {

				if (this.obj.nameTask) {

					this.tasks.push({

						name: 'Задача ' + this.obj.modded_id,
						local_name: 'Задача ' + this.obj.id,
						nameTask: this.obj.nameTask,
						dateStart: "",
						dateEnd: "",
						dateAll: "",
						trust: this.obj.trust,
						status: "plan"

					});

					this.c();
					this.close();
					this.obj.id++;
					this.obj.modded_id++;

				} else
					alert("Заполните поле описания карточки");
			}
		},
		add() {
			if ((this.obj.trust && !this.obj.status) ||
				(this.obj.statusCheck === "plan" && this.obj.nameTask) ||
				(this.obj.statusCheck === "work" && this.obj.nameTask && this.obj.trust && this.obj.dateStart) ||
				(this.obj.statusCheck === "done" && this.obj.nameTask && this.obj.trust && this.obj.dateStart && this.obj.dateEnd)) {
				for (i in this.tasks) {

					if (this.tasks[i]['local_name'] == this.obj.naming) {
						this.tasks[i]['nameTask'] = this.obj.nameTask;
						this.tasks[i]['dateStart'] = this.obj.dateStart;
						this.tasks[i]['dateEnd'] = this.obj.dateEnd;
						this.tasks[i]['trust'] = this.obj.trust;
						this.tasks[i]['status'] = this.obj.status;
						this.obj.naming = "";

						dateStart = this.tasks[i]['dateStart'].split(/\.|,|:/);
						dateEnd = this.tasks[i]['dateEnd'].split(/\.|,|:/);
						diffStart = new Date(dateStart[2], dateStart[1] - 1, dateStart[0], dateStart[3], dateStart[4], dateStart[5]).getTime();
						diffTEnd = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0], dateEnd[3], dateEnd[4], dateEnd[5]).getTime();
						lot = diffTEnd - diffStart;

						d = lot / (1000 * 60 * 60 * 24);
						h = (lot / (1000 * 60 * 60)) % 24;
						m = (lot / (1000 * 60)) % 60;
						s = (lot / 1000) % 60;

						this.tasks[i]['dateAll'] = "Дней: " + Math.trunc(d) +
							" Часов: " + Math.trunc(h) +
							" Минут: " + Math.trunc(m) +
							" Секунд: " + Math.trunc(s)
					}
				}
				this.close();
			} else
				alert("Заполните все поля");
		},

		edit(index) {
			this.mod = true;
			this.check = true;
			for (i in this.tasks) {
				if (this.tasks[i]['local_name'].includes(index + 1)) {
					if (this.tasks[i]['status'] == "plan")
						this.obj.statusCheck = "plan"

					else if (this.tasks[i]['status'] == "work")
						this.obj.statusCheck = "work"

					else if (this.tasks[i]['status'] == "done")
						this.obj.statusCheck = "done"

					this.obj.naming = this.tasks[i]['local_name'];
					this.obj.nameTask = this.tasks[i]['nameTask'];
					this.obj.dateStart = this.tasks[i]['dateStart'];
					this.obj.dateEnd = this.tasks[i]['dateEnd'];
					this.obj.trust = this.tasks[i]['trust'];
					this.obj.status = this.tasks[i]['status']
				}
			}
			this.statusCheck();
		},
		complite(index) {
			for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i]['local_name'].includes(index + 1)) {
					if (this.tasks[i]['status'] === "plan") {
						this.tasks[i]['status'] = "work";
						if (this.tasks[i]['dateStart'] === "") {
							this.tasks[i]['dateStart'] = new Date().toLocaleString()
							dateStart = this.tasks[i]['dateStart'].split(/\.|,|:/);
						}

					} else if (this.tasks[i]['status'] === "work") {
						this.tasks[i]['status'] = "done";
						if (this.tasks[i]['dateEnd'] === "") {
							this.tasks[i]['dateEnd'] = new Date().toLocaleString()
							dateEnd = this.tasks[i]['dateEnd'].split(/\.|,|:/);
						}

						diffStart = new Date(dateStart[2], dateStart[1] - 1, dateStart[0], dateStart[3], dateStart[4], dateStart[5]).getTime();
						diffTEnd = new Date(dateEnd[2], dateEnd[1] - 1, dateEnd[0], dateEnd[3], dateEnd[4], dateEnd[5]).getTime();
						lot = diffTEnd - diffStart;
						d = lot / (1000 * 60 * 60 * 24);
						h = (lot / (1000 * 60 * 60)) % 24;
						m = (lot / (1000 * 60)) % 60;
						s = (lot / 1000) % 60;
						this.tasks[i]['dateAll'] = "Дней: " + this.zeroPrefix(d) + Math.trunc(d) +
							" Часов: " + this.zeroPrefix(h) + Math.trunc(h) +
							" Минут: " + this.zeroPrefix(m) + Math.trunc(m) +
							" Секунд: " + this.zeroPrefix(s) + Math.trunc(s)
					}

					this.c()
				}
			}
		},
		deleteDesk(index) {
			for (let i = 0; i < this.tasks.length; i++) {
				if (this.tasks[i]['local_name'].includes(index + 1)) {
					for (let j = i + 1; j < this.tasks.length; j++) {
						this.tasks[j]["local_name"] = 'Задача ' + (this.tasks[j]["local_name"].split(" ")[1] - 1)
					}

					this.tasks.splice(i, 1)
					this.obj.id--
				}
			}
		},

		c() {
			this.count.cPlan = 0;
			this.count.cWork = 0;
			this.count.cDone = 0;
			for (i in this.tasks) {
				if (this.tasks[i]['status'] === "plan")
					this.count.cPlan++

				if (this.tasks[i]['status'] === "work")
					this.count.cWork++

				if (this.tasks[i]['status'] === "done")
					this.count.cDone++
					
			}
		},
		statusCheck() {
			if (this.obj.statusCheck == 'plan') {
				this.disableTrust = true;
				this.disableDateStart = true;
				this.disableDateEnd = true;

			} else if (this.obj.statusCheck == 'work') {
				this.disableTrust = false;
				this.disableDateStart = false;
				this.disableDateEnd = true;

			} else {
				this.disableTrust = false;
				this.disableDateStart = false;
				this.disableDateEnd = false;
			}
		}
	}
};

new Vue({
	el: '.all',
	mixins: [methods]
});