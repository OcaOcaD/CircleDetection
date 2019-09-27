// //
// viewAsTree = ( circles ) => {
//     mt = [];
//     for (const c of circles) {
//         let node = {
//             text: "",
//             nodes = []
//         }
//         node.text = c.name + " => r: " + c.radius;
//         mt.push( node );
//     }
//     // var mt = [
//     //   {
//     //     text: "Parent 1",
//     //     nodes: [
//     //       {
//     //         text: "Child 1",
//     //         nodes: [
//     //           {
//     //             text: "Grandchild 1"
//     //           },
//     //           {
//     //             text: "Grandchild 2"
//     //           }
//     //         ]
//     //       },
//     //       {
//     //         text: "Child 2"
//     //       }
//     //     ]
//     //   },
//     //   {
//     //     text: "Parent 2"
//     //   },
//     //   {
//     //     text: "Parent 3"
//     //   },
//     //   {
//     //     text: "Parent 4"
//     //   },
//     //   {
//     //     text: "Parent 5"
//     //   }
//     // ];
//     $('#treeview').treeview({data: mt});
// }