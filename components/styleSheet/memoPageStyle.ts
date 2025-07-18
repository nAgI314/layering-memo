import { StyleSheet } from "react-native";

export const memoPageStyles = StyleSheet.create({
  header: {
    backgroundColor: '#e1e1e1',
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom:8,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonGroup: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize:20,
  },
  arrow: {
    borderWidth: 2,
  },
  layer: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  eachRow:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
    // color:"#fff"
  },
  image: {
    width: 30,
    height: 30,
  },
  addButton: {
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
  },
  // memoTitle: {
  //   paddingTop:10,
  //   paddingBottom:10,
  // },
});