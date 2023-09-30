package controller

import (
	"fmt"
	"log"
	"templrjs/model"
	"templrjs/pkg/database"

	"github.com/gin-gonic/gin"

	"github.com/jinzhu/gorm"
)

var db *gorm.DB
var err error

// User struct alias
type User = model.User

// Data is mainle generated for filtering and pagination
type Data struct {
	TotalData    int64
	FilteredData int64
	Data         []User
}

func GetUser(c *gin.Context) {
	db = database.GetDB()
	id := c.Params.ByName("id")
	var User User

	if err := db.Where("id = ? ", id).First(&User).Error; err != nil {
		log.Println(err)
		c.AbortWithStatus(404)
		return

	}

	db.Model(&User)
	// SELECT * FROM "tags"  WHERE ("User_id" = 1)

	c.JSON(200, User)
}

func GetUsers(c *gin.Context) {
	db = database.GetDB()
	var Users []User
	var data Data

	// Define and get sorting field
	sort := c.DefaultQuery("Sort", "ID")

	// Define and get sorting order field
	order := c.DefaultQuery("Order", "DESC")

	// Define and get offset for pagination
	offset := c.DefaultQuery("Offset", "0")

	// Define and get limit for pagination
	limit := c.DefaultQuery("Limit", "25")

	// Get search keyword for Search Scope
	search := c.DefaultQuery("Search", "")

	table := ToSnakeCase(db.NewScope(&model.User{}).TableName())
	//log.Println(ToSnakeCase(db.NewScope(&model.User{}).TableName()))
	query := db.Select(table + ".*")
	query = query.Offset(Offset(offset))
	query = query.Limit(Limit(limit))
	query = query.Order(SortOrder(table, sort, order))
	query = query.Scopes(Search(search))

	if err := query.Find(&Users).Error; err != nil {
		log.Println(err)
		c.AbortWithStatus(404)
		return
	}
	// Count filtered table
	// We are resetting offset to 0 to return total number.
	// This is a fix for Gorm offset issue
	query = query.Offset(0)
	query.Table(table).Count(&data.FilteredData)

	// Count total table
	db.Table(table).Count(&data.TotalData)

	// Set Data result
	data.Data = Users

	c.JSON(200, data)
}

func CreateUser(c *gin.Context) {
	db = database.GetDB()
	var User User

	c.ShouldBindJSON(&User)

	if err := db.Create(&User).Error; err != nil {
		fmt.Println(err)
		c.AbortWithStatus(404)
		return
	}

	c.JSON(200, User)
}

func UpdateUser(c *gin.Context) {
	db = database.GetDB()
	var User User
	id := c.Params.ByName("id")

	if err := db.Where("id = ?", id).First(&User).Error; err != nil {
		log.Println(err)
		c.AbortWithStatus(404)
		return
	}

	c.ShouldBindJSON(&User)

	db.Save(&User)
	c.JSON(200, User)
}

func DeleteUser(c *gin.Context) {
	db = database.GetDB()
	id := c.Params.ByName("id")
	var User User

	if err := db.Where("id = ? ", id).Delete(&User).Error; err != nil {
		log.Println(err)
		c.AbortWithStatus(404)
		return
	}

	c.JSON(200, gin.H{"id#" + id: "deleted"})
}
