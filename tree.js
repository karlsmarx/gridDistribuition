class Node {
	constructor({
		lines,
		columns,
	}) {
		this.lines = lines;
		this.columns = columns;

		this.weight = lines * columns;

		this.left = null;
		this.right = null;
		this.root = null;
	}

	next() {
		if (this.right) {
			return this.right;
		}
		
		return this.left;
	}
}

class Tree {
	constructor() {
		this.root = new Node({ lines: 0, columns: 0 });
	}

	insert(root, nodeLeft, nodeRight) {
		if(root.left === null && root.right === null) {				
			root.left = nodeLeft;
			root.right = nodeRight;
	
			nodeLeft.root = root;
			nodeRight.root = root;
		} else {	
			this.insert(root.left, Object.assign({}, nodeLeft), Object.assign({}, nodeRight));
			this.insert(root.right, Object.assign({}, nodeLeft), Object.assign({}, nodeRight));
		}
	}

	removeNode(node) {
		const subTree = node.root;

		if (subTree.left) {
			if (subTree.left.weight === node.weight) {
				subTree.left = null;
			}
		}

		if (subTree.right) {
			if (subTree.right.weight === node.weight) {
				subTree.right = null;
			}
		}
	}

	trimByWeight(root, weight, edge) {
		if (root) {
			const newWeight = weight + root.weight;
			
			if (newWeight > edge) {
				this.removeNode(root);
			} else {
				this.trimByWeight(root.left, newWeight, edge); 
				this.trimByWeight(root.right, newWeight, edge); 
			}
		} 
	}

	bestPath(root, compareTo) {
		if (root) {
			if ((root.left) && (root.right)) {
				if ((root.right.columns + compareTo.columns) <= 3) {
					this.removeNode(root.left);
					this.bestPath(root.right, compareTo);
				} else {
					this.removeNode(root.right);
					this.bestPath(root.left, compareTo.next);
				}
			} else {
				if (root.right) {
					this.bestPath(root.right, compareTo);
				}
	
				if (root.left) {
					this.bestPath(root.left, compareTo);
				}
			}
		}
	}

	orderMatrix(root, matrix, columnSum = 0, level = 1) {
		if (root) {

		}
	}

	print(root, level = 0) {
		if (!root) return;

		let result = "";
		for (let i = 0; i < level; i++) {
			result += "--";
		}
		result += `[${root.lines}, ${root.columns}]`;

		const left = this.print(root.left, (level + 1));
		const right = this.print(root.right, (level + 1));
		if (left) {
			result += `\n${left}`;
		}

		if (right) {
			result += `\n${right}`;
		}

		return result;
	}
}

arrayToTree = (array) => {
	const tree = new Tree();

	array.map((element) => {
		const nodeLeft = new Node({ lines: element[0], columns: element[1]});
		const nodeRight = new Node({ lines: (element[0] + 1), columns: (element[1] + 1)})
		tree.insert(tree.root, nodeLeft, nodeRight);
	});

	return tree;
}

const testArray = [[1,2], [1,1], [1,1], [2,1], [1,2]];
const tree = arrayToTree(testArray);

tree.trimByWeight(tree.root, 0, 30);
tree.bestPath(tree.root.right, tree.root.right);

console.log(tree.print(tree.root.right));

console.log("-------------")
// console.log(tree.print(tree.root));

// const matrix = Array(3).fill().map(()=>Array(3).fill(0))
// tree.orderMatrix(tree.root, matrix, 3);
// console.log(matrix);
