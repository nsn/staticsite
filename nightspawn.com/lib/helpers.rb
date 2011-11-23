include Nanoc3::Helpers::Breadcrumbs
include Nanoc3::Helpers::LinkTo
include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Rendering

def create_tag_pages
  tag_set(items).each do |tag|
    item = Nanoc3::Item.new(
      #"= render('_tag_page', :tag => '#{tag}')",           # use locals to pass data
      render('_tag_page', :tag => tag),           # use locals to pass data
      { :title => "Category: #{tag}", :is_hidden => true}, # do not include in sitemap.xml
      "/rants/tags/#{tag}/",                               # identifier
      :binary => false
    )
    items << item
  end
end


def tag_set(items=nil)
  items = @items if items.nil?
  tags = Set.new
  items.each do |item|
    next if item[:tags].nil?
    item[:tags].each { |tag| tags << tag }
  end
  tags.to_a
end

def items_for_tag(tag)
  tagitems = Array.new
  items.each do |i|
    next if i[:tags].nil?
    i[:tags].each do |t| 
      tagitems << t
#      if tag == t 
#        tagitems << i 
#      end 
    end
  end
end

